#!/usr/bin/env node
import { createCommand, getLogo, printInfo } from 'ycmd';

export default createCommand({
  command: 'info', //  [-e]
  aliases: ['i'],
  describe: 'Get info about current project',

  meta: import.meta,
  async main() {
    const config = {
      name: 'ycmd ??',
      version: '0.0.0 ??',
    };
    // eslint-disable-next-line no-console
    console.log(getLogo());
    printInfo({
      // eslint-disable-next-line no-console
      log: (...a) => console.log(...a),
      config,
    });
  },
});
