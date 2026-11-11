import {fillTextBox} from '@remotion/layout-utils';
import {fontFamily} from '../font';
import type {LessonData, LessonCaption} from '../types';
import {displayTexts} from './display';

export type Line = {y: number; height: number; size: number; weight: number; marker: string; captions: LessonCaption[]};
export function layoutReading(data: LessonData) {
  const lines: Line[] = [];
  const display = displayTexts(data.blocks);
  let y = 0;
  for (const block of data.blocks) {
    const size = block.kind === 'heading' ? 52 : 44;
    const weight = block.kind === 'heading' ? 700 : 400;
    const height = size * 1.65;
    const box = fillTextBox({maxBoxWidth: 1590, maxLines: 1000});
    let line: Line | undefined;
    for (const caption of block.captions) {
      const {newLine} = box.add({text: display.get(caption)!, fontFamily, fontSize: size, fontWeight: weight, validateFontIsLoaded: true});
      if (!line || newLine) {
        if (line) y += height;
        line = {y, height, size, weight, marker: !line ? block.kind === 'bullet' ? '•' : block.kind === 'numbered' ? `${block.number}.` : '' : '', captions: []};
        lines.push(line);
      }
      line.captions.push(caption);
    }
    y += height + (block.kind === 'heading' ? 22 : 26);
  }
  return {lines, height: y};
}
