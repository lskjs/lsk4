#!/usr/bin/env node
import { readdir } from 'node:fs/promises';

import { createCommand, findBin, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'prepack',
  describe: 'Prepare package for publishing',
  builder: (yargs) =>
    yargs.options({
      dir: {
        describe: 'Specify the tmp directory for operation',
        type: 'string',
        default: '.release',
      },
    }),

  meta: import.meta,
  async main({ isRoot, ctx, cwd, argv } = {}) {
    if (isRoot) {
      await shellParallel('ycmd prepack', { ctx, argv });
      return;
    }
    const { dir = '.release' } = argv;

    // TODO: очень опасная операция, надо сделать проверку на то, что приходит в dir
    await shell('rm -rf .release', { ctx, silence: 1 });

    const files = await readdir(cwd);
    const packageJson = await import(`${cwd}/package.json`);
    let cmd = findBin('clean-publish');
    cmd += ` --without-publish --temp-dir ${dir} --fields "//, ///, ////, private"`;
    if (packageJson.files?.length) {
      const packageFiles = packageJson.files;
      packageFiles.push('package.json');
      const removedFiles = files.filter((f) => !packageFiles.includes(f));
      cmd += ` --files "${removedFiles.join(' ')}"`;
    }

    await shell(cmd, { ctx });
  },
});
