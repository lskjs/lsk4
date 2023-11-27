#!/usr/bin/env node
import { createCommand, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'publish [-d]',
  describe: 'Publish the package',
  builder: (yargs) =>
    yargs.options({
      dry: {
        alias: ['d', 'dry-run', 'without-publish'],
        describe: 'Perform a dry run without actually publishing',
        type: 'boolean',
        default: false,
      },
    }),
  async main({ isRoot, ctx, argv } = {}) {
    if (isRoot) {
      await shellParallel('ycmd publish', { ctx, argv });
      return;
    }
    const { dry: isDryRun } = argv;
    let cmd = 'pnpm publish .release --no-git-checks';
    if (isDryRun) cmd += ' --dry-run';
    await shell(cmd, { ctx });
  },
});
