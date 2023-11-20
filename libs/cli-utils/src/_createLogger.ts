/* eslint-disable no-console */

import { Logger } from './types.js';

export const createLogger = (props: any = {}): Logger => {
  const { ns = 'cli', name = '' } = props;
  const isSilent =
    typeof process && (!!+(process.env.LSK_SILENT || '') || process.argv?.includes('--silent'));
  let log = {
    trace: (...args: any[]) => {
      console.log('[t]', ns, name, ...args);
    },
    debug: (...args: any[]) => {
      console.log('[d]', ns, name, ...args);
    },
    info: (...args: any[]) => {
      console.log('[i]', ns, name, ...args);
    },
    warn: (...args: any[]) => {
      console.error('[w]', ns, name, ...args);
    },
    error: (...args: any[]) => {
      console.error('[e]', ns, name, ...args);
    },
    fatal: (...args: any[]) => {
      console.error('[f]', ns, name, ...args);
    },
  };
  if (isSilent) {
    log = {
      trace: () => {},
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: log.error,
      fatal: log.fatal,
    };
  }
  return log;
};
