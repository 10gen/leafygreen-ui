import emotion from './emotion';
import createEmotionServer from '@emotion/server/create-instance';

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = emotion;

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream,
} = createEmotionServer(cache);

export default emotion;
