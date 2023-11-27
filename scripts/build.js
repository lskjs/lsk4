#!/usr/bin/env node
import { createCommand, getCwdInfo, isEnvSkip, pnpmRecursive, shell } from 'ycmd';

export default createCommand({
  command: 'build [-w][-p][-s][-e]',
  describe: 'Build project',
  builder: (yargs) =>
    yargs.options({
      watch: {
        alias: 'w',
        describe: 'Monitors files for changes.',
        type: 'boolean',
        default: false,
      },
      prod: {
        alias: 'p',
        describe: 'Enables production mode. Optimization increases build time.',
        type: 'boolean',
        default: false,
      },
      silent: {
        alias: 's',
        describe: 'Limits output to only critical errors.',
        type: 'boolean',
        default: false,
      },
      exec: {
        alias: 'e',
        describe: 'Executes specified command after compilation.',
        type: 'boolean',
        default: false,
      },
    }),

  meta: import.meta,
  async main({ argv, isRoot, log, cwd, ctx } = {}) {
    if (isEnvSkip(['build', 'builds'])) {
      log.warn('SKIP_BUILD');
      return;
    }
    if (isRoot) {
      // const env = {
      //   YCMD_SILENT: '1',
      //   YCMD_PROD: '1',
      // };
      await pnpmRecursive(`run build --prod --silent`, { ctx, argv }); // NOTE: env
      return;
    }
    const { isJs, isTs, isNest, isBabel } = await getCwdInfo({ cwd });
    if (isNest) {
      await shell(`ycmd build:nest`, { ctx, argv });
    } else if (isBabel) {
      await shell(`ycmd build:babel`, { ctx, argv });
    } else if (isTs) {
      await shell(`ycmd build:ts`, { ctx, argv });
    } else if (isJs) {
      log.debug('[skip] no need to build js projects');
    } else {
      log.error('UNKNOWN TYPE');
    }
  },
});
