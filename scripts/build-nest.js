#!/usr/bin/env node
import { createCommand, findBin, getCwdInfo, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'build:nest [--watch]',
  describe: 'Build NestJS project',
  builder: (yargs) =>
    yargs.options({
      watch: {
        alias: 'w',
        describe: 'Watch for file changes.',
        type: 'boolean',
        default: false,
      },
    }),

  meta: import.meta,
  async main({ isRoot, ctx, cwd, argv } = {}) {
    if (isRoot) {
      await shellParallel(`ycmd build:nest`, { ctx, argv });
      return;
    }
    const { watch: isWatch = false } = argv;
    const { isApp } = await getCwdInfo({ cwd });

    if (isApp && isWatch) {
      const cmd = `${findBin('nest')} start --watch --debug`;
      await shell(cmd, { ctx });
    } else {
      await shell('ycmd build:ts', { ctx, argv });
    }
  },
});
