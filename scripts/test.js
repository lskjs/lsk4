#!/usr/bin/env node
import { createCommand, isEnvSkip, pnpmRecursive, shell } from 'ycmd';

export default createCommand({
  command: 'test [-w][-s]',
  describe: 'Run tests',
  builder: (yargs) =>
    yargs.options({
      watch: {
        describe: 'Run tests in watch mode',
        type: 'boolean',
        default: false,
      },
      silent: {
        describe: 'Limits output to only critical errors.',
        type: 'boolean',
        default: false,
      },
    }),

  meta: import.meta,
  async main({ isRoot, ctx, argv, log } = {}) {
    if (isEnvSkip(['test', 'tests'])) {
      log.warn('SKIP_TEST');
      return;
    }
    if (isRoot) {
      const env = {
        YCMD_SILENT: '1',
        YCMD_PROD: '1',
      };
      await pnpmRecursive(`run test`, { ctx, argv, env });
      return;
    }
    await shell('ycmd test:uvu', { ctx, argv });
    await shell('ycmd test:jest', { ctx, argv });
    await shell('ycmd test:eslint', { ctx, argv });
    await shell('ycmd test:size-limit', { ctx, argv });
  },
});
