#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { createCommand, readJson, shellParallel } from 'ycmd';

export default createCommand({
  command: 'bump',
  describe: 'Bump package version',

  meta: import.meta,
  async main({ isRoot, cwd, ctx } = {}) {
    if (isRoot) {
      await shellParallel(`ycmd bump`, { ctx });
      return;
    }
    const filename = join(cwd, 'package.json');
    const packageData = await readJson(filename);
    await writeFile(
      filename,
      JSON.stringify(
        {
          ...packageData,
          '//': `${packageData['//'] || ''}/`,
        },
        null,
        2,
      ),
    );
  },
});
