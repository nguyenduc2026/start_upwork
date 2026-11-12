import assert from 'node:assert/strict';
import {existsSync, mkdtempSync, readFileSync, rmSync, rmdirSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {project} from './common';
import {apiError, captionBlocks, captionsFromSaved, keepCachedVoice, markVocab, parseLesson, saveAndCaption, type Alignment} from './tts';
import {displayTexts} from '../src/LessonVideo/display';
import type {LessonData} from '../src/types';

const parsed = parseLesson(`<!-- lesson-video
id: test-01
type: reading
title: "Test: punctuation"
voice: auto
speed: 0.9
-->
<!-- passage:start -->
**Heading**
- **Improve** the flow
7. Shipping changes quickly!
We handle traffic. We handle traffic.
<!-- passage:end -->
## Từ vựng trong bài
| Từ | Phiên âm | Loại | Nghĩa |
|---|---|---|---|
| handle traffic (v) | /test/ | v | xử lý |
| ship | /test/ | v | gửi |
| change / update | /test/ | n | thay đổi |
| quick | /test/ | adj | nhanh |
| flow heading | /test/ | n | không khớp khác block |
`);
assert.equal(parsed.meta.title, 'Test: punctuation');
assert.deepEqual(parsed.blocks.map(b => b.kind), ['heading', 'bullet', 'numbered', 'text']);
assert.equal(parsed.blocks[2].number, '7');
assert.equal(parsed.blocks[1].text, 'Improve the flow.');
assert.equal(parsed.blocks[0].addedPeriod, true);
assert.equal(parsed.blocks[1].addedPeriod, true);
assert.equal(parsed.blocks[2].addedPeriod, false);
const duration = captionBlocks(parsed.blocks, parsed.text);
const matched = markVocab(parsed.blocks, parsed.vocab);
assert(matched.has(0) && matched.has(2) && matched.has(3));
assert(!matched.has(4));
assert.equal(parsed.blocks[3].captions.filter(c => c.vocab === 0).length, 4);
const flat = parsed.blocks.flatMap(b => b.captions);
assert.equal(flat[0].text, 'Heading.');
assert(flat.slice(1).every(c => c.text.startsWith(' ')));
assert(flat.every(c => c.endMs - c.startMs === 350));
assert(duration > flat.length * 0.35);
const display = displayTexts(parsed.blocks);
assert.equal(display.get(flat[0]), 'Heading');
assert.equal(display.get(parsed.blocks[1].captions.at(-1)!), ' flow');
assert.equal(display.get(parsed.blocks[3].captions.at(-1)!), ' traffic.');
assert.equal(flat[0].text, 'Heading.'); // Display does not mutate TTS text/timing.

const fixture = parseLesson(`<!-- lesson-video
id: test-02
type: speaking
title: Test
-->
<!-- passage:start -->
A B.
<!-- passage:end -->`);
captionBlocks(fixture.blocks, fixture.text, {characters: ['A', ' ', 'B', '.'], character_start_times_seconds: [0, 0.1, 0.2, 0.3], character_end_times_seconds: [0.1, 0.2, 0.3, 0.4]});
assert.equal(fixture.blocks[0].captions[1].startMs, 200); // first letter, not the preceding space
assert.equal(fixture.blocks[0].captions[1].endMs, 400);
assert.equal(fixture.blocks[0].captions[1].pageBreakAfter, true);
assert.throws(() => parseLesson('no metadata'), /upgrade/);
console.log('PASS: metadata, blocks, cleaning, fake timing, whitespace alignment, sentence breaks, vocab phrases/variants/repetitions/block boundaries.');

const makeAlignment = (text: string): Alignment => ({characters: [...text], character_start_times_seconds: [...text].map((_, i) => i / 10), character_end_times_seconds: [...text].map((_, i) => (i + 1) / 10)});
captionBlocks(fixture.blocks, fixture.text, makeAlignment('A\r\n   B.'));
assert.equal(fixture.blocks[0].captions[1].startMs, 600);
assert.equal(fixture.blocks[0].captions[1].endMs, 800);
captionBlocks(fixture.blocks, fixture.text, makeAlignment('AB.'));
assert.equal(fixture.blocks[0].captions[1].startMs, 100);
assert.throws(() => captionBlocks(fixture.blocks, fixture.text, makeAlignment('A C.')), /ngoài khoảng trắng/);
assert.throws(() => captionBlocks(fixture.blocks, fixture.text, {...makeAlignment('A B.'), character_end_times_seconds: []}), /không hợp lệ/);
console.log('PASS #1: whitespace/newline normalization and removed spaces align; real character mismatches throw.');

const temp = mkdtempSync(path.join(tmpdir(), 'lesson-video-check-'));
const paths = {audioPath: path.join(temp, 'audio', 'test.mp3'), publicPath: path.join(temp, 'public', 'test.mp3'), alignmentPath: path.join(temp, 'data', 'test.alignment.json')};
const dataPath = path.join(temp, 'data', 'test.json');
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {throw new Error('Tests forbid network calls.');};
try {
  // Mock a successful paid response with bad timing: audio must survive failure.
  const response = new Response(JSON.stringify({audio_base64: Buffer.from('test-audio-bytes').toString('base64'), alignment: makeAlignment('A C.')}));
  const result = await response.json();
  assert.throws(() => saveAndCaption(result, fixture.blocks, fixture.text, paths), /Audio đã lưu tại .*alignment không khớp văn bản/);
  assert.equal(readFileSync(paths.audioPath, 'utf8'), 'test-audio-bytes');
  assert.equal(readFileSync(paths.publicPath, 'utf8'), 'test-audio-bytes');
  assert.deepEqual(JSON.parse(readFileSync(paths.alignmentPath, 'utf8')), result.alignment);
  assert(!readFileSync(paths.alignmentPath, 'utf8').includes('audio_base64'));
  assert(!existsSync(dataPath));
  writeFileSync(dataPath, 'existing-data');
  assert.throws(() => captionsFromSaved(fixture.blocks, fixture.text, paths));
  assert.equal(readFileSync(dataPath, 'utf8'), 'existing-data');
  // Repair only the saved alignment; recovery uses the same paid MP3, no fetch.
  writeFileSync(paths.alignmentPath, JSON.stringify(makeAlignment('A\n B.')));
  assert.equal(captionsFromSaved(fixture.blocks, fixture.text, paths), 0.5);
  assert.equal(readFileSync(paths.audioPath, 'utf8'), 'test-audio-bytes');
  assert.throws(() => captionsFromSaved(fixture.blocks, fixture.text, {...paths, audioPath: path.join(temp, 'missing.mp3')}), /Cần MP3/);
  console.log('PASS #1 files: MP3/copy/raw alignment survive timing failure; lesson JSON untouched; saved-alignment recovery uses no network.');

  const error = await apiError(new Response(JSON.stringify({detail: {status: 'api_key_id_used_as_api_key', message: 'Use the actual API key.'}}), {status: 401}));
  assert.equal(error.message, 'ElevenLabs HTTP 401 (api_key_id_used_as_api_key): Use the actual API key.');
  const long = await apiError(new Response(JSON.stringify({detail: {code: 'limit', message: 'x'.repeat(250)}}), {status: 429}));
  assert.equal(long.message.split(': ')[1].length, 200);
  const redacted = await apiError(new Response(JSON.stringify({detail: {status: 'test-secret', message: 'test-secret sk_test123'}}), {status: 403}), ['test-secret']);
  assert(!redacted.message.includes('test-secret') && !redacted.message.includes('sk_test123'));
  const nonJson = await apiError(new Response('not JSON', {status: 502}));
  assert(nonJson.message.startsWith('ElevenLabs HTTP 502:'));
  console.log('PASS #3: HTTP status/code/message, 200-character cap, non-JSON fallback, credential redaction (mock responses only).');
} finally {
  globalThis.fetch = originalFetch;
  // Delete only the explicitly created files and empty directories, no recursive removal.
  for (const file of [...Object.values(paths), dataPath]) if (existsSync(file)) rmSync(file);
  for (const directory of ['audio', 'public', 'data']) if (existsSync(path.join(temp, directory))) rmdirSync(path.join(temp, directory));
  rmdirSync(temp);
}
console.log('PASS #4: addedPeriod recorded; synthetic periods hidden; original punctuation and TTS captions preserved.');

const warnings: string[] = [];
const cached = {voiceId: 'cached-test-value', voiceIndex: 1, fake: false} as LessonData;
const current = {voiceId: 'current-test-value', voiceIndex: 2};
assert.equal(keepCachedVoice(current, cached, true, false, s => warnings.push(s)).voiceIndex, 1);
assert.deepEqual(warnings, ['Giữ giọng cũ (vị trí 1) vì audio đã có. Giọng theo cấu hình hiện tại: vị trí 2. Dùng --force để tạo lại (tốn credits).']);
assert.equal(keepCachedVoice(current, cached, true, true, s => warnings.push(s)), current);
assert.equal(keepCachedVoice(current, {...cached, fake: true}, true, false), current);
assert.equal(keepCachedVoice(current, cached, false, false), current);
keepCachedVoice({...current, voiceId: cached.voiceId}, cached, true, false, s => warnings.push(s));
assert.equal(warnings.length, 1);
console.log('PASS #5: cached voice warning uses positions only; unchanged/forced/fake/missing-audio cases handled.');

const overlap = parseLesson(`<!-- lesson-video
id: overlap-01
type: reading
title: Overlap
-->
<!-- passage:start -->
We handle traffic and handle issues. We handle traffic.
<!-- passage:end -->`);
captionBlocks(overlap.blocks, overlap.text);
const overlapVocab = [{word: 'handle', ipa: '', meaning: ''}, {word: 'handle traffic', ipa: '', meaning: ''}];
assert.equal(markVocab(overlap.blocks, overlapVocab).size, 2);
const tokens = overlap.blocks[0].captions;
assert.equal(tokens[1].vocab, 1);
assert.equal(tokens[2].vocab, 1);
assert.equal(tokens[1].occurrence, tokens[2].occurrence);
assert.equal(tokens[4].vocab, 0);
assert.equal(tokens[7].vocab, 1);
assert.equal(tokens[7].occurrence, tokens[8].occurrence);
assert.notEqual(tokens[1].occurrence, tokens[7].occurrence);
const before = JSON.stringify(tokens);
markVocab(overlap.blocks, overlapVocab);
assert.equal(JSON.stringify(tokens), before);
console.log('PASS #6: longest vocabulary phrase wins, original indices preserved, repeated phrases stay intact, re-marking is deterministic.');
const lock = JSON.parse(readFileSync(path.join(project, 'package-lock.json'), 'utf8')) as {packages: Record<string, {version: string}>};
const versions = Object.entries(lock.packages).filter(([name]) => /node_modules\/(remotion|@remotion\/[^/]+)$/.test(name)).map(([, pkg]) => pkg.version);
assert.deepEqual([...new Set(versions)], ['4.0.542']);
console.log(`PASS: all ${versions.length} Remotion packages in lockfile use 4.0.542.`);

// Manual mode: Whisper words → character alignment (no network).
{
  const {alignTextToWords, tokensToWords} = await import('./whisper-align');
  const {heardWords} = await import('./align');
  const words = tokensToWords([{text: ' [_BEG_]', startMs: 0, endMs: 0}, {text: ' Lara', startMs: 100, endMs: 300}, {text: 'vel', startMs: 300, endMs: 500}, {text: ' and', startMs: 600, endMs: 700}, {text: ' front', startMs: 800, endMs: 900}, {text: ' end', startMs: 900, endMs: 1000}, {text: '.', startMs: 1000, endMs: 1000}]);
  assert.deepEqual(words.map(w => w.text), ['Laravel', 'and', 'front', 'end.']);
  const text = 'Laravel & frontend 11.';
  const al = alignTextToWords(text, words, 2000);
  assert.equal(al.characters.join(''), text);
  const blocks = parseLesson(`<!-- lesson-video\nid: test-03\ntype: reading\ntitle: T\n-->\n<!-- passage:start -->\n${text}\n<!-- passage:end -->`).blocks;
  captionBlocks(blocks, text, al);
  const c = blocks[0].captions;
  assert.equal(c[0].startMs, 100); // Laravel
  assert.equal(c[1].startMs, 600); // & ↔ "and"
  assert.equal(c[2].startMs, 800); // frontend ↔ "front" (substitution)
  assert(c[3].startMs >= c[2].endMs && c[3].endMs <= 2000); // "11" unheard → interpolated, monotonic
  assert(c.every((x, i) => i === 0 || x.startMs >= c[i - 1].startMs));
  const hw = heardWords([{text: ' Hi', t_dtw: 50}, {text: ' there', t_dtw: 200}], 3000);
  assert.deepEqual(hw.map(w => [w.startMs, w.endMs]), [[380, 1180], [1880, 2680]]); // t_dtw×10 − 120 ms, end = min(+800, next start)
  console.log('PASS manual: Whisper sub-word merge, &/and, substitutions, interpolation, DTW shift.');
}
