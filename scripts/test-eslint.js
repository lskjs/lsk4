#!/usr/bin/env node
import { isCI } from '@lskjs/env';
import { createCommand, findBin, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'test:eslint [--fix] [-s]',
  describe: 'Run ESLint on the source files',
  builder: (yargs) =>
    yargs.options({
      silent: {
        alias: 's',
        describe: 'Run in silent mode, limiting output to critical errors.',
        type: 'boolean',
        default: false,
      },
      fix: {
        describe: 'Automatically fix problems.',
        type: 'boolean',
        default: false,
      },
    }),
  async main({ isRoot, ctx, argv } = {}) {
    if (isRoot) {
      await shellParallel('ycmd test:eslint', { ctx, argv });
      return;
    }
    const { silent: isSilent = isCI, fix: isFix = false } = argv;

    let cmd = `${findBin('eslint')} src`;
    if (isSilent) cmd += ' --quiet';
    if (isFix) cmd += ' --fix';
    await shell(cmd, { ctx });
  },
});
