#!/usr/bin/env node
import { isCI, isDev } from '@lskjs/env';
import { createCommand, findBin, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'test:uvu [-w][-s][-b]',
  describe: 'Run Uvu tests on the project',
  builder: (yargs) =>
    yargs.options({
      watch: {
        alias: 'w',
        describe: 'Watch files for changes and rerun tests.',
        type: 'boolean',
        default: false,
      },
      // prod: {
      //   alias: 'p',
      //   describe: 'Enable production mode.',
      //   type: 'boolean',
      //   default: false,
      // },
      silent: {
        alias: 's',
        describe: 'Run in silent mode, limiting output to critical errors.',
        type: 'boolean',
        default: false,
      },
      bail: {
        alias: 'b',
        describe: 'Stop running tests after the first failure.',
        type: 'boolean',
        default: false,
      },
    }),
  async main({ isRoot, ctx, argv } = {}) {
    if (isRoot) {
      await shellParallel('ycmd test:uvu', { ctx, argv });
      return;
    }
    const {
      // prod: isProd = !isDev,
      silent: isSilent = isCI,
      watch: isWatch = false,
      bail: isBail = isCI,
    } = argv;

    let cmd = `${findBin('uvu')} tests`;
    const isTsm = true;
    if (isTsm) cmd += ' -r tsm';
    if (
      // isProd ||
      isSilent
    )
      cmd += ' --quiet';
    if (isBail) cmd += ' --bail';
    if (isWatch) cmd = `watchlist src tests -- ${cmd}`;
    await shell(cmd, { ctx });
  },
});
