import type {Alignment} from './tts';

// Word heard by Whisper, in milliseconds from the start of the mp3.
export type HeardWord = {text: string; startMs: number; endMs: number};

const norm = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, '');

// Whisper tokens are sub-words: a token without a leading space continues the previous word.
// Bracketed tokens ([_BEG_], [BLANK_AUDIO], [Music]...) are not speech.
export function tokensToWords(tokens: {text: string; startMs: number; endMs: number}[]): HeardWord[] {
  const words: HeardWord[] = [];
  for (const t of tokens) {
    if (!t.text.trim() || /^\s*\[.*\]\s*$/.test(t.text)) continue;
    const last = words.at(-1);
    if (last && !/^\s/.test(t.text)) {last.text += t.text; last.endMs = Math.max(last.endMs, t.endMs);}
    else words.push({text: t.text.trim(), startMs: t.startMs, endMs: Math.max(t.startMs, t.endMs)});
  }
  return words.filter(w => norm(w.text));
}

/**
 * Map the exact lesson text onto Whisper's word timings and return a character-level
 * Alignment (same shape ElevenLabs /with-timestamps returns), so the rest of the pipeline
 * (captionBlocks, --from-alignment) works unchanged.
 * Words are matched with an edit-distance alignment; lesson words Whisper missed or heard
 * differently ("11" vs "eleven") get times interpolated from their neighbours.
 */
export function alignTextToWords(text: string, heard: HeardWord[], durationMs: number): Alignment {
  const tokens = [...text.matchAll(/\S+/g)].map(m => ({index: m.index!, text: m[0], key: norm(m[0])}));
  const n = tokens.length, m = heard.length;
  if (!n) throw new Error('Văn bản rỗng.');
  if (!m) throw new Error('Whisper không nghe được từ nào trong mp3. Kiểm tra lại file audio.');
  const keys = heard.map(w => norm(w.text));
  // Edit distance on word sequences (match = 0, substitute / skip = 1).
  const dp = Array.from({length: n + 1}, (_, i) => Array.from({length: m + 1}, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
    const same = tokens[i - 1].key === keys[j - 1];
    dp[i][j] = Math.min(dp[i - 1][j - 1] + (same ? 0 : 1), dp[i - 1][j] + 1, dp[i][j - 1] + 1);
  }
  const times: ({start: number; end: number} | undefined)[] = new Array(n);
  for (let i = n, j = m; i > 0 && j > 0;) {
    const same = tokens[i - 1].key === keys[j - 1];
    if (dp[i][j] === dp[i - 1][j - 1] + (same ? 0 : 1)) {times[i - 1] = {start: heard[j - 1].startMs, end: heard[j - 1].endMs}; i--; j--;}
    else if (dp[i][j] === dp[i - 1][j] + 1) i--;
    else j--;
  }
  // Interpolate unmatched lesson words between matched neighbours; force monotonic times.
  let i = 0, prevEnd = 0;
  while (i < n) {
    if (times[i]) {
      const start = Math.max(prevEnd, times[i]!.start);
      times[i] = {start, end: Math.max(start + 1, times[i]!.end)};
      prevEnd = times[i]!.end; i++; continue;
    }
    let k = i;
    while (k < n && !times[k]) k++;
    const until = k < n ? Math.max(prevEnd, times[k]!.start) : Math.max(prevEnd, durationMs);
    const step = (until - prevEnd) / (k - i);
    for (let x = i; x < k; x++) times[x] = {start: prevEnd + step * (x - i), end: prevEnd + step * (x - i + 1)};
    prevEnd = until; i = k;
  }
  // Spread each word's time over its characters; whitespace fills the gap between words.
  const characters: string[] = [], starts: number[] = [], ends: number[] = [];
  let offset = 0, w = 0, last = 0;
  for (const char of text) {
    const token = tokens[w];
    if (token && offset >= token.index && offset < token.index + token.text.length) {
      const {start, end} = times[w]!;
      const len = token.text.length, pos = offset - token.index;
      starts.push(start + (end - start) * pos / len); ends.push(start + (end - start) * (pos + char.length) / len);
      last = ends.at(-1)!;
      if (offset + char.length >= token.index + token.text.length) w++;
    } else {
      const next = tokens[w] ? times[w]!.start : Math.max(last, durationMs);
      starts.push(last); ends.push(Math.max(last, next));
    }
    characters.push(char);
    offset += char.length;
  }
  return {characters, character_start_times_seconds: starts.map(s => s / 1000), character_end_times_seconds: ends.map(e => e / 1000)};
}
