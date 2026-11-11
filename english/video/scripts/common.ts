import {existsSync, readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import type {LessonData} from '../src/types';

export const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const repo = path.resolve(project, '../..');
export const assertId = (id: string) => {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(id)) throw new Error('ID bài không hợp lệ.');
  return id;
};
// Every output is grouped by skill (= the lesson's folder: reading, speaking, writing...).
export type SkillPaths = {skill: string; data: string; alignment: string; audio: string; publicAudio: string; audioSrc: string; video: string; preview: string};
export function skillPaths(skill: string, id: string): SkillPaths {
  assertId(skill); assertId(id);
  return {
    skill,
    data: path.join(project, 'data', skill, `${id}.json`),
    alignment: path.join(project, 'data', skill, `${id}.alignment.json`),
    audio: path.join(repo, 'english/audio', skill, `${id}.mp3`),
    publicAudio: path.join(project, 'public/audio', skill, `${id}.mp3`),
    audioSrc: `audio/${skill}/${id}.mp3`,
    video: path.join(project, 'out', skill, `${id}.mp4`),
    preview: path.join(project, 'out', skill, 'preview', id),
  };
}
export const skillOfLesson = (lessonFile: string) => path.basename(path.dirname(lessonFile));
// Find which skill folder holds data/<skill>/<id>.json (preview/render only receive the id).
export function locate(id: string): SkillPaths {
  assertId(id);
  const root = path.join(project, 'data');
  const skills = existsSync(root) ? readdirSync(root, {withFileTypes: true}).filter(d => d.isDirectory() && existsSync(path.join(root, d.name, `${id}.json`))).map(d => d.name) : [];
  if (skills.length !== 1) throw new Error(skills.length ? `id ${id} có ở nhiều kỹ năng: ${skills.join(', ')}.` : `Không thấy data/<kỹ năng>/${id}.json. Chạy tts trước.`);
  return skillPaths(skills[0], id);
}
// Relative POSIX path for Remotion CLI arguments (cwd = project).
export const rel = (file: string) => path.relative(project, file).split(path.sep).join('/');
export function readData(id: string): LessonData {
  return JSON.parse(readFileSync(locate(id).data, 'utf8'));
}
export function lessonPath(input: string) {
  const candidates = [path.resolve(input), path.resolve(repo, input)];
  const found = candidates.find(existsSync);
  if (!found) throw new Error('Không tìm thấy file bài học. Dùng đường dẫn từ root repo hoặc đường dẫn tuyệt đối.');
  return found;
}
// Invoke JavaScript entry points directly: no shell quoting, npm.cmd, or Unix commands.
export function runTs(script: string, args: string[]) {
  const result = spawnSync(process.execPath, [path.join(project, 'node_modules/tsx/dist/cli.mjs'), path.join(project, 'scripts', script), ...args], {cwd: project, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${script} thất bại (exit ${result.status}).`);
}
export function remotion(args: string[]) {
  const result = spawnSync(process.execPath, [path.join(project, 'node_modules/@remotion/cli/remotion-cli.js'), ...args, '--env-file=.env.example'], {cwd: project, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Remotion thất bại (exit ${result.status}).`);
}
export function reportError(error: unknown) {
  // Never dump request objects, API responses, or environment contents.
  console.error(error instanceof Error ? error.message : 'Thao tác thất bại.');
  process.exitCode = 1;
}
