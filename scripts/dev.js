#!/usr/bin/env node
import { createCommand, pnpmRecursive, shell } from 'ycmd';

export default createCommand({
  command: 'dev',
  describe: 'Run development tasks',

  meta: import.meta,
  async main({ isRoot, ctx } = {}) {
    if (isRoot) {
      await pnpmRecursive(`run dev`, { ctx });
      return;
    }
    // TODO: args to argv
    await shell('ycmd build', { ctx, argv: { watch: true } });
  },
});
