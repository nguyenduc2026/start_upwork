import {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {createTikTokStyleCaptions} from '@remotion/captions';
import {Underline} from '@remotion/rough-notation';
import {fillTextBox} from '@remotion/layout-utils';
import {fontFamily, ipaFontFamily, waitForIpa, waitUntilDone} from '../font';
import type {LessonCaption, LessonData} from '../types';
import {layoutReading} from './layout';
import {displayTexts} from './display';

const yellow = '#facc15';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const label = (data: LessonData) => data.id.replace(/-/g, ' ').toUpperCase();

function Words({captions, all, active, frame, fps, display}: {captions: LessonCaption[]; all: LessonCaption[]; active?: LessonCaption; frame: number; fps: number; display: Map<LessonCaption, string>}) {
  const groups: LessonCaption[][] = [];
  captions.forEach(c => {
    const previous = groups.at(-1);
    if (c.vocab !== undefined && previous && previous[0].occurrence === c.occurrence) previous.push(c);
    else groups.push([c]);
  });
  return <>{groups.map((group, i) => {
    const words = group.map((c, j) => {
      const text = display.get(c) ?? c.text;
      const space = i === 0 && j === 0 ? '' : text.match(/^\s+/)?.[0] ?? '';
      return <span key={j} style={{whiteSpace: 'pre', opacity: c.startMs > (frame / fps - 3) * 1000 ? 0.45 : 1}}>{space}<span style={{color: c === active ? '#0f172a' : '#f1f5f9', background: c === active ? '#38bdf8' : 'transparent', borderRadius: 5, padding: '0 6px', margin: '0 -6px'}}>{text.trimStart()}</span></span>;
    });
    if (group[0].vocab === undefined) return <span key={i}>{words}</span>;
    // Preserve the whole occurrence's timing when a phrase wraps to another line.
    const occurrence = all.filter(c => c.occurrence === group[0].occurrence);
    const start = 3 * fps + occurrence[0].startMs / 1000 * fps;
    const end = 3 * fps + occurrence.at(-1)!.endMs / 1000 * fps;
    return <Underline key={i} progress={interpolate(frame, [start, Math.max(start + 1, end)], [0, 1], clamp)} color={yellow} strokeWidth={3} iterations={2} padding={{top: 4}}>{words}</Underline>;
  })}</>;
}

function Main({data}: {data: LessonData}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tMs = (frame - fps * 3) / fps * 1000;
  const all = useMemo(() => data.blocks.flatMap(b => b.captions), [data]);
  const display = useMemo(() => displayTexts(data.blocks), [data]);
  const active = all.findLast(c => c.startMs <= tMs) ?? all[0];
  const layout = useMemo(() => layoutReading(data), [data]);
  const pages = useMemo(() => createTikTokStyleCaptions({captions: all, combineTokensWithinMilliseconds: 1e9}).pages, [all]);
  const page = pages.find(p => p.startMs <= tMs && tMs < p.startMs + p.durationMs) ?? pages.findLast(p => p.startMs <= tMs) ?? pages[0];
  const lineIndex = layout.lines.findIndex(l => l.captions.includes(active));
  const target = (i: number) => Math.min(Math.max(0, layout.lines[i]?.y - 230), Math.max(0, layout.height - 710));
  // Reconstruct the scroll at each transition from absolute frames; no state tied to playback order.
  let scroll = 0;
  for (let i = 1; i <= lineIndex; i++) {
    const start = 3 * fps + layout.lines[i].captions[0].startMs / 1000 * fps;
    scroll = interpolate(frame, [start, start + 8], [scroll, target(i)], clamp);
  }
  const speakingCaptions = page?.tokens.map(token => all.find(c => c.startMs === token.fromMs && c.endMs === token.toMs)!).filter(Boolean) ?? [];
  const speakingLines = useMemo(() => {
    const box = fillTextBox({maxBoxWidth: 1600, maxLines: 1000});
    const lines: LessonCaption[][] = [[]];
    for (const caption of speakingCaptions) {
      const {newLine} = box.add({text: display.get(caption)!, fontFamily, fontSize: 64, fontWeight: 600, validateFontIsLoaded: true});
      if (newLine) lines.push([]);
      lines.at(-1)!.push(caption);
    }
    return lines;
  }, [page, all, display]);
  const wordProps = {all, active, frame, fps, display};
  return <>
    <div style={{position: 'absolute', top: 64, left: 128, right: 128, display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#94a3b8'}}><span>{label(data)}</span><span>{data.type === 'speaking' ? 'LISTEN · SHADOW · REPEAT' : 'LISTEN & READ ALONG'}</span></div>
    {data.type === 'speaking' ? <div style={{position: 'absolute', top: 200, bottom: 180, left: 160, right: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div style={{fontSize: 64, lineHeight: 1.7, textAlign: 'center', fontWeight: 600}}>{speakingLines.map((captions, i) => <div key={i} style={{whiteSpace: 'nowrap'}}><Words captions={captions} {...wordProps}/></div>)}</div></div> : <div style={{position: 'absolute', left: 128, right: 128, top: 160, height: 740, overflow: 'hidden'}}>
      <div style={{transform: `translateY(${-scroll}px)`}}>{layout.lines.map((line, i) => <div key={i} style={{position: 'absolute', top: line.y, left: 64, fontSize: line.size, fontWeight: line.weight, lineHeight: `${line.height}px`, whiteSpace: 'nowrap', visibility: line.y - scroll < 0 || line.y - scroll + line.height > 740 ? 'hidden' : 'visible'}}>
        <span style={{position: 'absolute', right: '100%', paddingRight: 24, color: '#94a3b8'}}>{line.marker}</span><Words captions={line.captions} {...wordProps}/>
      </div>)}</div>
    </div>}
    <div style={{position: 'absolute', bottom: 85, left: 128, right: 128, height: 5, background: '#334155'}}><div style={{height: '100%', background: '#38bdf8', width: `${Math.min(100, Math.max(0, tMs / (data.durationSeconds * 1000) * 100))}%`}}/></div>
  </>;
}

export const LessonVideo = (data: LessonData) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [handle] = useState(() => delayRender('Wait for Inter and IPA fonts'));
  const [ready, setReady] = useState(false);
  useEffect(() => {Promise.all([waitUntilDone(), waitForIpa()]).then(() => {setReady(true); continueRender(handle);}).catch(cancelRender);}, [handle]);
  if (!ready) return null;
  const outro = frame >= Math.ceil((3 + data.durationSeconds + 1) * fps);
  return <AbsoluteFill style={{backgroundColor: '#0f172a', color: '#f1f5f9', fontFamily}}>
    {data.audioSrc !== null && <Audio from={3 * fps} src={staticFile(data.audioSrc)}/>}
    {frame < 3 * fps ? <div style={{margin: 'auto 160px'}}>
      <div style={{fontSize: 28, color: '#38bdf8', fontWeight: 700, marginBottom: 42}}>{label(data)}</div>
      <div style={{fontSize: 76, lineHeight: 1.25, fontWeight: 700, maxWidth: 1560}}>{data.title}</div>
      <div style={{fontSize: 32, color: '#94a3b8', marginTop: 48}}>Listen first. Then read along.</div>
    </div> : outro ? <div style={{position: 'absolute', inset: '80px 128px'}}>
      <div style={{fontSize: 24, color: '#94a3b8', marginBottom: 20}}>{label(data)} · REVIEW</div>
      <div style={{fontSize: 52, fontWeight: 700, marginBottom: 30}}>{data.vocab.length ? 'Words to remember' : 'Now try shadowing!'}</div>
      {data.vocab.length ? <div>{data.vocab.slice(0, 8).map((v, i) => <div key={i} style={{display: 'grid', gridTemplateColumns: '370px 420px 1fr', alignItems: 'center', minHeight: 88, borderBottom: '1px solid #334155', gap: 20, fontSize: 32}}><div style={{color: yellow, fontWeight: 600}}>{v.word}</div><div style={{fontFamily: ipaFontFamily, color: '#cbd5e1'}}>{v.ipa}</div><div>{v.meaning}</div></div>)}</div> : <div style={{fontSize: 36, color: '#94a3b8', marginTop: 90}}>Listen. Pause. Repeat in your own voice.</div>}
    </div> : <Main data={data}/>}
  </AbsoluteFill>;
};
