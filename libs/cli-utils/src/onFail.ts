import { Err } from '@macrobe/err';

import { log } from './log.js';

export function onFail(msg: string, err: any) {
  const errorMessage = msg || Err.getMessage(err);
  if (errorMessage) {
    log.fatal('');
    if (errorMessage) log.fatal(errorMessage);
    log.fatal('');
  }
  if (err) {
    log.error('');
    log.error(err);
    log.error('');
  }
  const isYargsError = !!msg; // && err.name === 'YError';
  if (isYargsError) {
    // eslint-disable-next-line no-console
    console.log('');
    // @ts-ignore
    String(this.showHelp());
    // eslint-disable-next-line no-console
    console.log('');
  }
  process.exit(1);
}
