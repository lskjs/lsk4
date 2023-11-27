#!/usr/bin/env node
import { createCommand, shell } from 'ycmd';

export default createCommand({
  command: 'build:yaml',
  describe: 'Run all build commands',

  meta: import.meta,
  async main({ ctx, argv } = {}) {
    await shell('ycmd build:docker-stack', { ctx, argv });
    await shell('ycmd build:gitlab-ci', { ctx, argv });
  },
});
