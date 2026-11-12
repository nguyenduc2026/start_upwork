// Manual mode, step 2: the mp3 was made on the ElevenLabs website (no timestamps), so run
// Whisper locally to get word timings, map them onto the lesson text, write data JSON.
// No API call, 0 credits. First run downloads whisper.cpp + the model (needs internet).
import {copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {config} from 'dotenv';
import {downloadWhisperModel, installWhisperCpp, transcribe, type WhisperModel} from '@remotion/install-whisper-cpp';
import type {LessonData} from '../src/types';
import {lessonPath, project, rel, reportError, skillOfLesson, skillPaths} from './common';
import {captionBlocks, chooseVoice, markVocab, parseLesson, sha, voiceList} from './tts';
import {alignTextToWords, tokensToWords} from './whisper-align';

// Windows only has prebuilt whisper.cpp binaries up to 1.6.0; 1.5.5 supports token-level (DTW) timestamps.
const WHISPER_VERSION = '1.5.5';
const whisperPath = path.join(project, '.whisper', 'whisper.cpp');

function toWav(mp3: string, wav: string) {
  // Remotion ships ffmpeg: `remotion ffmpeg ...`. Whisper needs 16 kHz mono 16-bit WAV.
  const result = spawnSync(process.execPath, [path.join(project, 'node_modules/@remotion/cli/remotion-cli.js'), 'ffmpeg', '-y', '-loglevel', 'error', '-i', mp3, '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wav], {cwd: project, stdio: 'inherit'});
  if (result.error || result.status !== 0) throw new Error('Không đổi được mp3 sang WAV (ffmpeg).');
  return (statSync(wav).size - 44) / 32000 * 1000; // duration in ms (16 kHz × 2 bytes, 44-byte header)
}

// Word onsets from DTW token times (t_dtw, in 10 ms units). Measured on reading-01 against the
// exact ElevenLabs API timings (same mp3): DTW is ~120 ms late on average, while segment offsets
// drift up to 1 s. t_dtw − 120 ms → median error ~50 ms, 90% < 160 ms, no word lit early.
const DTW_SHIFT_MS = 120;
export function heardWords(tokens: {text: string; t_dtw: number}[], durationMs: number) {
  const words = tokensToWords(tokens.map(t => {const startMs = Math.max(0, t.t_dtw * 10 - DTW_SHIFT_MS); return {text: t.text, startMs, endMs: startMs};}));
  // A word lasts until the next one starts (max 800 ms) — only used for underline/page timing.
  words.forEach((w, i) => {w.endMs = Math.min(w.startMs + 800, words[i + 1]?.startMs ?? durationMs);});
  return words;
}

export async function align(args: string[]) {
  const input = args.find(a => !a.startsWith('--'));
  if (!input || args.some(a => a.startsWith('--') && a !== '--force')) throw new Error('Dùng: npm run align -- <file.md> [--force]');
  const force = args.includes('--force');
  if (!process.env.VOICE_ID) config({path: path.join(project, '.env'), quiet: true});
  const lessonFile = lessonPath(input);
  const {meta, blocks, vocab, text, speed} = parseLesson(readFileSync(lessonFile, 'utf8'));
  const out = skillPaths(skillOfLesson(lessonFile), meta.id);
  if (!existsSync(out.audio)) throw new Error(`Chưa có mp3. Tải từ ElevenLabs rồi lưu thành: ${out.audio}\n(Chạy npm run paste -- ${input} để xem hướng dẫn.)`);
  const model = (process.env.WHISPER_MODEL ?? 'base.en') as WhisperModel;
  const hash = sha('manual' + text + model + sha(readFileSync(out.audio).toString('base64')));
  const cached: LessonData | undefined = existsSync(out.data) ? JSON.parse(readFileSync(out.data, 'utf8')) : undefined;
  mkdirSync(path.dirname(out.publicAudio), {recursive: true});
  if (!force && cached?.manual && cached.hash === hash) {
    copyFileSync(out.audio, out.publicAudio);
    console.log(`Đã align trước đó (mp3 + văn bản không đổi). Dùng lại ${rel(out.data)}.`);
    return meta.id;
  }

  console.log(`Whisper ${WHISPER_VERSION} + model ${model} (lần đầu sẽ tải về .whisper/, cần mạng)...`);
  await installWhisperCpp({to: whisperPath, version: WHISPER_VERSION, printOutput: false});
  await downloadWhisperModel({model, folder: whisperPath, printOutput: false});
  const wav = path.join(project, '.whisper', `${meta.id}.wav`);
  const durationMs = toWav(out.audio, wav);
  console.log('Đang nghe mp3 để lấy timing từng từ...');
  const whisperCppOutput = await transcribe({inputPath: wav, whisperPath, whisperCppVersion: WHISPER_VERSION, model, modelFolder: whisperPath, tokenLevelTimestamps: true, language: 'en', printOutput: false});
  const heard = heardWords(whisperCppOutput.transcription.flatMap(segment => segment.tokens), durationMs);
  const alignment = alignTextToWords(text, heard, durationMs);
  rmSync(wav, {force: true});

  // Same files as the API path: raw alignment (lets --from-alignment rebuild for free) + timing JSON.
  mkdirSync(path.dirname(out.alignment), {recursive: true});
  writeFileSync(out.alignment, JSON.stringify(alignment) + '\n');
  copyFileSync(out.audio, out.publicAudio);
  const durationSeconds = Math.max(captionBlocks(blocks, text, alignment), durationMs / 1000);
  const matched = markVocab(blocks, vocab);
  const voice = chooseVoice(meta, voiceList());
  const data: LessonData = {id: meta.id, type: meta.type as LessonData['type'], title: meta.title, hash, model: `manual:eleven_multilingual_v2+whisper:${model}`, ...voice, speed, durationSeconds, audioSrc: out.audioSrc, fake: false, manual: true, blocks, vocab};
  writeFileSync(out.data, JSON.stringify(data, null, 2) + '\n');
  const exact = heard.length;
  console.log(`Whisper nghe được ${exact} từ / văn bản ${text.split(/\s+/).filter(Boolean).length} từ. Từ vựng khớp: ${matched.size}/${vocab.length}.`);
  console.log(`Đã ghi ${rel(out.data)} (${durationSeconds.toFixed(2)}s), 0 credits.\nXem thử: npm run studio -- --props=${rel(out.data)}\nRender: npm run render -- ${meta.id}`);
  return meta.id;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) align(process.argv.slice(2)).catch(reportError);
