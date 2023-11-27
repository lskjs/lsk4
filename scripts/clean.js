#!/usr/bin/env node
import { join } from 'path';
import { createCommand, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'clean [--force]',
  describe: 'Clean build artifacts',
  builder: (yargs) =>
    yargs.options({
      force: {
        describe: 'Enables production mode. Optimization increases build time.',
        type: 'boolean',
        default: false,
      },
    }),

  meta: import.meta,
  async main({ isRoot, ctx, cwd, argv } = {}) {
    if (isRoot) {
      await shellParallel('ycmd clean', { ctx, argv });
      // return;
    }

    const tempFiles = ['coverage', '.release', '.reports'];
    const forceFiles = ['node_modules', 'lib', 'cjs'];
    const files = argv.force ? [...tempFiles, ...forceFiles] : tempFiles;
    const cmd = `rm -rf ${files.map((name) => join(cwd, name)).join(' ')}`;
    await shell(cmd, { ctx });
  },
});
