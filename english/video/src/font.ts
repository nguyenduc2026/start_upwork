import {loadFont} from '@remotion/google-fonts/Inter';
import {loadFont as loadIpa} from '@remotion/google-fonts/NotoSans';

export const {fontFamily, waitUntilDone} = loadFont('normal', {
  weights: ['400', '600', '700'], subsets: ['latin', 'latin-ext', 'vietnamese'],
});
export const {fontFamily: ipaFontFamily, waitUntilDone: waitForIpa} = loadIpa('normal', {
  weights: ['400'], subsets: ['latin', 'latin-ext'],
});
