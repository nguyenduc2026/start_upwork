import type {Caption} from '@remotion/captions';

export type LessonCaption = Caption & {vocab?: number; occurrence?: number};
export type Block = {
  kind: 'heading' | 'bullet' | 'numbered' | 'text';
  text: string;
  addedPeriod?: boolean;
  number?: string;
  captions: LessonCaption[];
};
export type LessonData = {
  id: string;
  type: 'reading' | 'speaking' | 'writing';
  title: string;
  hash: string;
  model: string;
  voiceId: string;
  voiceIndex: number | null;
  speed: number;
  durationSeconds: number;
  audioSrc: string | null;
  fake: boolean;
  manual?: boolean; // audio made by hand on the ElevenLabs website, timing from local Whisper
  blocks: Block[];
  vocab: {word: string; ipa: string; meaning: string}[];
};
