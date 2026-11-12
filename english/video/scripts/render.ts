import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {locate, readData, rel, remotion, reportError} from './common';
try {
  const id = process.argv[2] ?? '';
  readData(id);
  const p = locate(id);
  mkdirSync(path.dirname(p.video), {recursive: true});
  remotion(['render', 'src/index.ts', 'LessonVideo', rel(p.video), `--props=${rel(p.data)}`, '--codec=h264', '--concurrency=4',
    // Sharp text: lossless PNG frames (default is JPEG q80, which blurs glyph edges) + high-quality x264.
    '--image-format=png', '--crf=16', '--x264-preset=slow', '--color-space=bt709']);
} catch (error) {reportError(error);}
