import type {Block, LessonCaption} from '../types';

// Derive display-only strings; Caption.text must remain the exact TTS token.
export function displayTexts(blocks: Block[]) {
  const result = new Map<LessonCaption, string>();
  for (const block of blocks) block.captions.forEach((c, i) => {
    result.set(c, block.addedPeriod && i === block.captions.length - 1 ? c.text.replace(/\.$/, '') : c.text);
  });
  return result;
}
