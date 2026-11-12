import {tts} from './tts';
import {align} from './align';
import {reportError, runTs} from './common';
try {
  const args = process.argv.slice(2);
  // --manual: mp3 was made on the ElevenLabs website → Whisper timing instead of the API.
  const id = args.includes('--manual') ? await align(args.filter(a => a !== '--manual')) : await tts(args);
  if (!args.includes('--dry-run')) {runTs('preview.ts', [id]); runTs('render.ts', [id]);}
} catch (error) {reportError(error);}
