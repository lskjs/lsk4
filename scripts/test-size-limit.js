#!/usr/bin/env node

import { isCI, isDev } from '@lskjs/env';
import { join } from 'path';
import { createCommand, findBin, readJson, shell, shellParallel } from 'ycmd';

const main = createCommand({
  command: 'test:size-limit [-s]',
  describe: 'Check size of your JS files',
  builder: (yargs) =>
    yargs.options({
      // prod: {
      //   describe: 'Enables production mode.',
      // },
      silent: {
        alias: 's',
        describe: 'Limits output to only critical errors.',
      },
    }),

  meta: import.meta,
  async main({ isRoot, ctx, argv, cwd, log } = {}) {
    if (isRoot) {
      await shellParallel('ycmd test:size-limit', { ctx, argv });
      return;
    }

    const filename = join(cwd, 'package.json');
    const packageJson = await readJson(filename);
    if (!packageJson['size-limit']) {
      log.debug('[skip] size-limit rc not found');
      return;
    }

    // const isProd = !isDev || !!+process.env.YCMD_PROD || argv.prod;
    const isSilent = !!+process.env.YCMD_SILENT || argv.silent || isCI;
    let cmd = findBin('size-limit');
    // if (isProd || isSilent) cmd += ' --silent';
    if (isSilent) cmd += ' --silent';
    await shell(cmd, { ctx });
  },
});

export default main;
