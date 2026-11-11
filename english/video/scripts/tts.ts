import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {config} from 'dotenv';
import type {Block, LessonCaption, LessonData} from '../src/types';
import {assertId, lessonPath, project, rel, reportError, skillOfLesson, skillPaths} from './common';

// multilingual_v2: natural intonation for long-form narration (Flash v2.5 sounded flat).
// Costs ~1 credit/char on the API (Flash was ~0.5).
export const model = 'eleven_multilingual_v2';
const creditsPerChar = 1;
// Lower stability = wider emotional range; style adds emphasis. Tuned for clear, lively narration.
export const voiceSettings = {stability: 0.4, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true};
export const sha = (value: string) => createHash('sha256').update(value).digest('hex');
const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`#]/g, '').trim();
const normalize = (s: string) => s.toLowerCase().replace(/’/g, "'").replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
const variants = (s: string) => new Set([s, ...['s', 'es', 'ed', 'd', 'ing', 'ly'].map(x => s + x), ...(s.endsWith('e') ? [s.slice(0, -1) + 'ing'] : []), ...(s.endsWith('y') ? [s.slice(0, -1) + 'ies', s.slice(0, -1) + 'ied'] : [])]);

export function parseLesson(source: string) {
  const metadata = source.match(/<!--\s*lesson-video\s*\r?\n([\s\S]*?)-->/)?.[1];
  const passage = source.match(/<!--\s*passage:start\s*-->([\s\S]*?)<!--\s*passage:end\s*-->/)?.[1];
  if (!metadata || !passage?.trim()) throw new Error('Thiếu metadata/passage. Chạy /english-lesson upgrade <file> trước.');
  const meta: Record<string, string> = {};
  for (const line of metadata.split(/\r?\n/)) {
    const m = line.match(/^\s*([\w]+):\s*(.*?)\s*$/);
    if (m) meta[m[1]] = m[2].replace(/\s+#.*$/, '').replace(/^(["'])(.*)\1$/, '$2');
  }
  assertId(meta.id ?? '');
  if (!['reading', 'speaking', 'writing'].includes(meta.type)) throw new Error('type phải là reading, speaking hoặc writing.');
  if (!meta.title) throw new Error('Thiếu title.');
  const speed = Number(meta.speed ?? 1);
  if (!Number.isFinite(speed) || speed < 0.7 || speed > 1.2) throw new Error('speed phải từ 0.7 đến 1.2.');
  const blocks: Block[] = passage.split(/\r?\n/).filter(s => s.trim()).map(line => {
    const s = line.trim();
    const numbered = s.match(/^(\d+)[.)]\s+/);
    const kind: Block['kind'] = /^(\*\*(?:(?!\*\*).)+\*\*|#{1,6}\s+.*)$/.test(s) ? 'heading' : /^[-+]\s+/.test(s) ? 'bullet' : numbered ? 'numbered' : 'text';
    let text = plain(s.replace(/^[-+]\s+/, '').replace(/^\d+[.)]\s+/, ''));
    const addedPeriod = !/[.!?,;:]["')\]]?$/.test(text);
    if (addedPeriod) text += '.';
    return {kind, text, addedPeriod, ...(numbered ? {number: numbered[1]} : {}), captions: []};
  });
  const section = source.match(/^#{1,6}\s+[^\r\n]*Từ vựng trong bài[^\r\n]*\r?\n([\s\S]*?)(?=^#{1,6}\s|$(?![\s\S]))/mi)?.[1] ?? '';
  const table = section.match(/^\|.*\r?\n\|[\s:|\-]+\r?\n(?:\|.*(?:\r?\n|$))+/m)?.[0];
  const vocab: LessonData['vocab'] = [];
  if (table) {
    const rows = table.trim().split(/\r?\n/).map(row => row.split('|').slice(1, -1).map(plain));
    const headers = rows[0].map(s => s.toLowerCase());
    const indices = ['từ', 'phiên âm', 'nghĩa'].map(s => headers.indexOf(s));
    if (indices.some(i => i < 0)) throw new Error('Bảng từ vựng cần cột Từ, Phiên âm, Nghĩa.');
    for (const row of rows.slice(2, 10)) vocab.push({word: row[indices[0]], ipa: row[indices[1]], meaning: row[indices[2]]});
  }
  return {meta, speed, blocks, vocab, text: blocks.map(b => b.text).join('\n')};
}

export type Alignment = {characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[]};

// Map original UTF-16 offsets to timestamps, tolerating only whitespace normalization.
function alignmentPositions(text: string, alignment: Alignment) {
  const {characters, character_start_times_seconds: starts, character_end_times_seconds: ends} = alignment;
  if (!Array.isArray(characters) || characters.length !== starts?.length || characters.length !== ends?.length || !characters.length || characters.some(c => typeof c !== 'string' || !c.length) || starts.some((s, i) => !Number.isFinite(s) || s < 0 || !Number.isFinite(ends[i]) || ends[i] < s || (i > 0 && s < starts[i - 1]))) throw new Error('Alignment không hợp lệ.');
  const aligned: {char: string; entry: number}[] = [];
  characters.forEach((value, entry) => {for (const char of value) aligned.push({char, entry});});
  const nonSpace = aligned.filter(c => !/\s/u.test(c.char));
  if (nonSpace.map(c => c.char).join('') !== text.replace(/\s/gu, '')) throw new Error('Alignment không khớp văn bản (khác ký tự ngoài khoảng trắng).');
  const positions: number[] = [];
  let sourceOffset = 0, next = 0;
  for (const char of text) {
    if (!/\s/u.test(char)) {
      const entry = nonSpace[next++].entry;
      for (let j = 0; j < char.length; j++) positions[sourceOffset + j] = entry;
    }
    sourceOffset += char.length;
  }
  return {positions, characters, starts, ends};
}

export function captionBlocks(blocks: Block[], text: string, alignment?: Alignment) {
  const mapped = alignment ? alignmentPositions(text, alignment) : undefined;
  let offset = 0, globalIndex = 0, cursor = 0;
  for (const block of blocks) {
    const tokens = [...block.text.matchAll(/\S+/g)];
    block.captions = tokens.map((m, i): LessonCaption => {
      const start = offset + m.index!, end = start + m[0].length - 1;
      const startEntry = mapped?.positions[start] ?? 0;
      // Start at the word's first letter. ElevenLabs TTS puts pauses (after . , and line
      // breaks) inside the preceding whitespace, so using the space's start would light the
      // next word up to ~0.7s before it is spoken. The renderer keeps the previous word
      // highlighted through the gap.
      const startMs = mapped ? mapped.starts[startEntry] * 1000 : cursor;
      const endMs = mapped ? mapped.ends[mapped.positions[end]] * 1000 : cursor + 350;
      cursor = endMs + (/[.,!?;:]["')\]]?$/.test(m[0]) ? 400 : 0);
      const caption: LessonCaption = {text: `${globalIndex++ === 0 ? '' : ' '}${m[0]}`, startMs, endMs, timestampMs: (startMs + endMs) / 2, confidence: null};
      if (/[.!?]["')\]]?$/.test(m[0]) || i === tokens.length - 1) caption.pageBreakAfter = true;
      return caption;
    });
    offset += block.text.length + 1;
  }
  return alignment ? Math.max(...alignment.character_end_times_seconds) : cursor / 1000;
}

export function markVocab(blocks: Block[], vocab: LessonData['vocab']) {
  const matched = new Set<number>();
  let occurrence = 0;
  for (const block of blocks) for (const c of block.captions) {delete c.vocab; delete c.occurrence;}
  const candidates = vocab.flatMap((entry, v) => entry.word.replace(/\([^)]*\)/g, '').split(/[/,]/).map(s => ({v, words: s.trim().split(/\s+/).map(normalize)})).filter(c => c.words.every(Boolean))).sort((a, b) => b.words.length - a.words.length || a.v - b.v);
  for (const {v, words: phrase} of candidates) {
    for (const block of blocks) {
      const words = block.captions.map(c => normalize(c.text));
      for (let i = 0; i < words.length; i++) {
        if (phrase.every((word, j) => block.captions[i + j]?.occurrence === undefined && variants(word).has(words[i + j]))) {
          matched.add(v);
          const group = occurrence++;
          block.captions.slice(i, i + phrase.length).forEach(c => {c.vocab = v; c.occurrence = group;});
          i += phrase.length - 1;
        }
      }
    }
  }
  return matched;
}

export type AudioPaths = {audioPath: string; publicPath: string; alignmentPath: string};
export function saveTtsResponse(result: {audio_base64: string; alignment: Alignment}, paths: AudioPaths) {
  for (const file of Object.values(paths)) mkdirSync(path.dirname(file), {recursive: true});
  writeFileSync(paths.audioPath, Buffer.from(result.audio_base64, 'base64'));
  copyFileSync(paths.audioPath, paths.publicPath);
  writeFileSync(paths.alignmentPath, JSON.stringify(result.alignment, null, 2) + '\n');
}

export function captionsFromSaved(blocks: Block[], text: string, paths: AudioPaths) {
  if (!existsSync(paths.audioPath) || !existsSync(paths.alignmentPath)) throw new Error('Cần MP3 và data/<kỹ năng>/<id>.alignment.json đã lưu để dùng --from-alignment.');
  try {
    const alignment = JSON.parse(readFileSync(paths.alignmentPath, 'utf8')) as Alignment;
    return captionBlocks(blocks, text, alignment);
  } catch {
    throw new Error(`Audio đã lưu tại ${paths.audioPath}, alignment không khớp văn bản hoặc không hợp lệ. Sửa alignment/văn bản rồi dùng --from-alignment; không cần gọi API lại.`);
  }
}

export function saveAndCaption(result: {audio_base64: string; alignment: Alignment}, blocks: Block[], text: string, paths: AudioPaths) {
  saveTtsResponse(result, paths);
  return captionsFromSaved(blocks, text, paths);
}

// Only these response fields are eligible for logs. Redact known credentials even
// if a server reflects them in its error message; never log raw response objects.
export async function apiError(response: Pick<Response, 'status' | 'json'>, secrets: string[] = []) {
  const clean = (value: unknown) => {
    let s = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
    for (const secret of secrets.filter(Boolean)) s = s.split(secret).join('[REDACTED]');
    return s.replace(/sk_[a-zA-Z0-9_-]+/g, '[REDACTED]').replace(/[\r\n\t]/g, ' ');
  };
  let code = '', message = '';
  try {
    const body = await response.json();
    const detail = body?.detail;
    code = clean(detail?.status || detail?.code).slice(0, 100);
    message = clean(detail?.message).slice(0, 200);
  } catch { /* Non-JSON errors still report HTTP status. */ }
  return new Error(`ElevenLabs HTTP ${response.status}${code ? ` (${code})` : ''}: ${message || 'Kiểm tra key/quyền/credits; không tự thử lại.'}`);
}

type Voice = {voiceId: string; voiceIndex: number | null};
export const voiceList = () => {
  const voices = (process.env.VOICE_ID ?? '').split(',').map(v => v.trim()).filter(Boolean);
  if (!voices.length) throw new Error('Thiếu VOICE_ID. Điền english/video/.env theo .env.example.');
  return voices;
};
// Fixed per lesson: auto rotates all voices, male = odd positions, female = even positions.
export function chooseVoice(meta: Record<string, string>, voices: string[]): Voice {
  const request = (meta.voice ?? 'auto').split(/[\s,]+/)[0];
  const n = BigInt(meta.id.match(/\d+/)?.[0] ?? `0x${sha(meta.id)}`);
  let pool = voices.map((voiceId, i) => ({voiceId, voiceIndex: i + 1}));
  if (request === 'male' || request === 'female') pool = pool.filter(v => v.voiceIndex % 2 === (request === 'male' ? 1 : 0));
  if (!pool.length) {console.warn('Pool giọng rỗng; dùng toàn bộ danh sách.'); pool = voices.map((voiceId, i) => ({voiceId, voiceIndex: i + 1}));}
  if (/^[a-zA-Z0-9]{15,}$/.test(request)) return {voiceId: request, voiceIndex: voices.includes(request) ? voices.indexOf(request) + 1 : null};
  if (['auto', 'male', 'female'].includes(request)) return pool[Number(((n > 0n ? n : 1n) - 1n) % BigInt(pool.length))];
  throw new Error('voice phải là auto, male, female hoặc voice ID hợp lệ.');
}
export function keepCachedVoice(current: Voice, cached: LessonData | undefined, hasAudio: boolean, force: boolean, warn = console.warn): Voice {
  if (force || !hasAudio || !cached?.voiceId || cached.fake) return current;
  if (cached.voiceId !== current.voiceId) warn(`Giữ giọng cũ (vị trí ${cached.voiceIndex ?? 'ngoài danh sách'}) vì audio đã có. Giọng theo cấu hình hiện tại: vị trí ${current.voiceIndex ?? 'ngoài danh sách'}. Dùng --force để tạo lại (tốn credits).`);
  return {voiceId: cached.voiceId, voiceIndex: cached.voiceIndex};
}

export async function tts(args: string[]) {
  const input = args.find(a => !a.startsWith('--'));
  if (!input || args.some(a => a.startsWith('--') && !['--fake', '--dry-run', '--force', '--from-alignment'].includes(a))) throw new Error('Dùng: npm run tts -- <file.md> [--dry-run | --fake | --from-alignment] [--force]');
  const dry = args.includes('--dry-run'), fake = args.includes('--fake'), force = args.includes('--force');
  const fromAlignment = args.includes('--from-alignment');
  if (fromAlignment && (fake || force)) throw new Error('--from-alignment không kết hợp với --fake hoặc --force.');
  // dotenv reads secrets only inside the runtime; never print or inspect its result.
  if (!process.env.VOICE_ID || (!dry && !fake && !fromAlignment && !process.env.ELEVENLABS_API_KEY)) config({path: path.join(project, '.env'), quiet: true});
  const lessonFile = lessonPath(input);
  const {meta, blocks, vocab, text, speed} = parseLesson(readFileSync(lessonFile, 'utf8'));
  if (text.length > 2000) throw new Error(`${text.length} ký tự > 2.000. Hãy rút ngắn bài.`);
  const out = skillPaths(skillOfLesson(lessonFile), meta.id);
  const {data: dataPath, audio: audioPath, publicAudio: publicPath} = out;
  const paths: AudioPaths = {audioPath, publicPath, alignmentPath: out.alignment};
  let cached: LessonData | undefined;
  if (existsSync(dataPath)) cached = JSON.parse(readFileSync(dataPath, 'utf8'));
  const voices = voiceList();
  let selected = chooseVoice(meta, voices);
  // Audio made by hand on the ElevenLabs website (npm run align): never overwrite it with an API call.
  if (cached?.manual && existsSync(audioPath) && !force && !dry && !fake && !fromAlignment) throw new Error(`Audio bài này tạo thủ công trên web. Dùng: npm run align -- ${input}. Muốn gọi API thay thế: thêm --force (tốn credits).`);
  // Existing real audio keeps its original voice unless forced; content/model/speed still invalidate the hash.
  selected = keepCachedVoice(selected, cached, existsSync(audioPath), force);
  const hash = sha(text + selected.voiceId + model + speed + JSON.stringify(voiceSettings));
  let durationSeconds = captionBlocks(blocks, text);
  const matched = markVocab(blocks, vocab);
  const voiceLabel = selected.voiceIndex === null ? 'ngoài danh sách (không xác định nam/nữ)' : `vị trí ${selected.voiceIndex} (${selected.voiceIndex % 2 ? 'nam' : 'nữ'})`;
  console.log(`Số ký tự: ${text.length}\nCredits ước tính: ${text.length * creditsPerChar} (${model})\nGiọng sẽ dùng: ${voiceLabel}`);
  console.log(`Từ vựng khớp: ${vocab.filter((_, i) => matched.has(i)).map(v => v.word).join(', ') || '(không có)'}`);
  console.log(`Từ vựng không khớp: ${vocab.filter((_, i) => !matched.has(i)).map(v => v.word).join(', ') || '(không có)'}`);
  if (matched.size < vocab.length) console.warn('Cảnh báo: từ vựng không khớp vẫn xuất hiện ở outro.');
  if (dry) {console.log(`\nVăn bản đã làm sạch:\n${text}\n\nDry-run: không gọi API, không ghi file; 0 credits.`); return meta.id;}
  if (!fromAlignment && !fake && !force && cached && !cached.fake && cached.hash === hash && existsSync(audioPath)) {
    mkdirSync(path.dirname(publicPath), {recursive: true}); copyFileSync(audioPath, publicPath);
    console.log('Dùng lại cache, 0 credits.'); return meta.id;
  }
  if (fromAlignment) {
    durationSeconds = captionsFromSaved(blocks, text, paths);
    markVocab(blocks, vocab);
    mkdirSync(path.dirname(publicPath), {recursive: true}); copyFileSync(audioPath, publicPath);
  } else if (!fake) {
    if (!process.env.ELEVENLABS_API_KEY) throw new Error('Thiếu ELEVENLABS_API_KEY. Điền english/video/.env theo .env.example.');
    let response: Response;
    try {
      response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(selected.voiceId)}/with-timestamps?output_format=mp3_44100_128`, {
        method: 'POST', headers: {'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json'},
        body: JSON.stringify({text, model_id: model, voice_settings: {...voiceSettings, speed}}), signal: AbortSignal.timeout(120000),
      });
    } catch {throw new Error('Không kết nối được ElevenLabs; không tự thử lại.');}
    if (!response.ok) throw await apiError(response, [process.env.ELEVENLABS_API_KEY, ...voices, selected.voiceId]);
    const result = await response.json() as {audio_base64?: string; alignment?: Alignment};
    if (!result.audio_base64 || !result.alignment) throw new Error('Response thiếu audio_base64 hoặc alignment.');
    durationSeconds = saveAndCaption({audio_base64: result.audio_base64, alignment: result.alignment}, blocks, text, paths);
    markVocab(blocks, vocab);
  }
  const data: LessonData = {id: meta.id, type: meta.type as LessonData['type'], title: meta.title, hash, model, ...selected, speed, durationSeconds, audioSrc: fake ? null : out.audioSrc, fake, blocks, vocab};
  mkdirSync(path.dirname(dataPath), {recursive: true}); writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n');
  console.log(`${fake ? 'Fake: không gọi API, không tạo MP3; 0 credits.' : fromAlignment ? 'Dựng lại từ alignment đã lưu, không gọi API; 0 credits.' : 'Đã tạo audio.'}\nĐã ghi ${rel(dataPath)} (${durationSeconds.toFixed(2)}s).`);
  return meta.id;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) tts(process.argv.slice(2)).catch(reportError);
