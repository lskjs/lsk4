#!/usr/bin/env node
import { createCommand, findBin, getCwdInfo, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'build:babel [-w]',
  describe: 'Build Babel project',
  builder: (yargs) =>
    yargs.options({
      watch: {
        alias: 'w',
        describe: 'Monitors files for changes.',
        type: 'boolean',
        default: false,
      },
      dist: {
        describe: 'dist dir',
      },
    }),

  meta: import.meta,
  async main({ isRoot, ctx, cwd, argv } = {}) {
    if (isRoot) {
      await shellParallel(`ycmd build:babel`, { ctx, argv });
      return;
    }
    const { watch: isWatch = false, dist: libDir = 'lib' } = argv;
    if (!isWatch) await shell(`rm -rf ${libDir}`, { ctx, silence: 1 });
    await shell(`mkdir -p ${libDir}`, { ctx, silence: 1 });

    const { isApp } = await getCwdInfo({ cwd });
    let cmd;
    if (isApp && isWatch) {
      cmd = findBin('babel-node');
      cmd += ' src';
    } else {
      cmd = findBin('babel');
      cmd += ` src --out-dir ${libDir} --source-maps true --extensions ".js,.jsx,.ts,.tsx" --copy-files`;
      if (isWatch) {
        cmd += ` --watch`;
      }
    }
    await shell(cmd, { ctx });
  },
});
