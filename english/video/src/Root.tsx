import {Composition} from 'remotion';
import {LessonVideo} from './LessonVideo';
import type {LessonData} from './types';

const defaults: LessonData = {
  id: 'lesson', type: 'reading', title: 'Choose lesson props to preview', hash: '', model: '',
  voiceId: '', voiceIndex: null, speed: 1, durationSeconds: 1, audioSrc: null, fake: true, blocks: [], vocab: [],
};
export const Root = () => <Composition
  id="LessonVideo" component={LessonVideo} width={1920} height={1080} fps={30}
  durationInFrames={330} defaultProps={defaults}
  calculateMetadata={({props}) => ({durationInFrames: Math.ceil((3 + props.durationSeconds + 1 + 6) * 30), defaultOutName: props.id})}
/>;
