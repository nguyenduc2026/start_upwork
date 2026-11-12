import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {locate, readData, rel, remotion, reportError} from './common';

try {
  const id = process.argv[2] ?? '';
  const data = readData(id);
  const p = locate(id);
  const seconds = [1.5, 3 + Math.min(2, data.durationSeconds / 4), 3 + data.durationSeconds / 2, 3 + Math.max(0, data.durationSeconds - 1), 3 + data.durationSeconds + 1 + 3];
  mkdirSync(p.preview, {recursive: true});
  // --frames accepts a single frame or a range, not a comma-separated sparse list.
  // Render five stills instead of accidentally rendering every frame between them.
  seconds.forEach((s, i) => remotion(['still', 'src/index.ts', 'LessonVideo', path.join(p.preview, `${i + 1}-${['intro', 'main-start', 'main-middle', 'main-end', 'outro'][i]}.png`), `--props=${rel(p.data)}`, `--frame=${Math.floor(s * 30)}`, '--image-format=png', '--log=error']));
  console.log(`Đã tạo 5 PNG: ${rel(p.preview)}/`);
} catch (error) {reportError(error);}
