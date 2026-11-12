// Manual mode, step 1: write the text + settings to paste into the ElevenLabs website
// (e.g. a free account). No API call, 0 credits.
import {mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {config} from 'dotenv';
import {lessonPath, project, rel, reportError, skillOfLesson, skillPaths} from './common';
import {chooseVoice, parseLesson, voiceList, voiceSettings} from './tts';
import {readFileSync} from 'node:fs';

export function paste(args: string[]) {
  const input = args.find(a => !a.startsWith('--'));
  if (!input) throw new Error('Dùng: npm run paste -- <file.md>');
  if (!process.env.VOICE_ID) config({path: path.join(project, '.env'), quiet: true});
  const lessonFile = lessonPath(input);
  const {meta, text, speed} = parseLesson(readFileSync(lessonFile, 'utf8'));
  if (text.length > 2000) throw new Error(`${text.length} ký tự > 2.000. Hãy rút ngắn bài.`);
  const out = skillPaths(skillOfLesson(lessonFile), meta.id);
  const voice = chooseVoice(meta, voiceList());
  const gender = voice.voiceIndex === null ? 'ngoài danh sách' : voice.voiceIndex % 2 ? 'nam' : 'nữ';
  const folder = path.join(project, 'out', out.skill, 'paste');
  mkdirSync(folder, {recursive: true});
  const textFile = path.join(folder, `${meta.id}.txt`);
  const guideFile = path.join(folder, `${meta.id}.md`);
  writeFileSync(textFile, text + '\n');
  const guide = `# ${meta.id} — ${meta.title}

1. Mở https://elevenlabs.io/app/speech-synthesis/text-to-speech
2. **Giọng:** vị trí ${voice.voiceIndex ?? '-'} (${gender}) — Voice ID \`${voice.voiceId}\`
   (tìm trong My Voices / Voice Library; account free cần thêm giọng này vào My Voices trước)
3. **Model:** Eleven Multilingual v2
4. **Settings:** Speed ${speed} · Stability ${voiceSettings.stability * 100}% · Similarity ${voiceSettings.similarity_boost * 100}% · Style exaggeration ${voiceSettings.style * 100}% · Speaker boost ${voiceSettings.use_speaker_boost ? 'BẬT' : 'TẮT'}
5. **Dán văn bản:** mở \`${rel(textFile)}\`, Ctrl+A → Ctrl+C → dán vào ô nhập (${text.length} ký tự ≈ ${text.length} credits)
6. Bấm **Generate**, nghe thử. Ưng thì **Download** (MP3)
7. **Lưu file thành:** \`${path.relative(path.resolve(project, '../..'), out.audio).split(path.sep).join('/')}\`
8. Chạy: \`npm run align -- ${input}\` (Whisper trên máy lấy timing, 0 credits) → \`npm run studio\` / \`npm run render -- ${meta.id}\`

> Gói free: chỉ dùng phi thương mại. Công bố công khai thì ghi "elevenlabs.io" trong tiêu đề.
`;
  writeFileSync(guideFile, guide);
  console.log(guide.replace(/\*\*/g, '').replace(/`/g, ''));
  console.log(`Văn bản để dán: ${rel(textFile)}\nHướng dẫn: ${rel(guideFile)}`);
  return meta.id;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {paste(process.argv.slice(2));} catch (error) {reportError(error);}
}
