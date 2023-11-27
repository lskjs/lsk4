#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { isCI, isDev } from '@lskjs/env';
import { createCommand, findBin, getCwdInfo, readJson, shell, shellParallel } from 'ycmd';

const omit = (obj, keys) => {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
};

export default createCommand({
  command: 'test:jest [-w][-p][-s]',
  describe: 'Run jest tests',
  builder: (yargs) =>
    yargs.options({
      watch: {
        describe: 'Run tests in watch mode.',
        type: 'boolean',
        default: false,
      },
      prod: {
        describe: 'Enable production mode.',
        type: 'boolean',
        default: false,
      },
      silent: {
        describe: 'Run in silent mode, limiting output to critical errors.',
        type: 'boolean',
        default: false,
      },
    }),

  meta: import.meta,
  async main({ isRoot, cwd, ctx, args, log, argv } = {}) {
    if (isRoot) {
      await shellParallel('ycmd test:jest', { ctx, args });
      return;
    }

    const filename = join(cwd, 'package.json');
    const packageJson = await readJson(filename);
    if (!packageJson?.jest) {
      log.debug('[skip] jest rc not found in package.json');
      return;
    }

    const { prod: isProd = !isDev, silent: isSilent = isCI, watch: isWatch = false } = argv;
    let cmd = findBin('jest');
    cmd += ' --detectOpenHandles --coverage';
    if (!isWatch) cmd += ' --forceExit --runInBand';
    const { rootPath } = await getCwdInfo({ cwd });
    const jestConfigPath = `${rootPath}/scripts/jest.config.js`;
    if (isProd || isSilent) cmd += ' --silent';
    if (isSilent) cmd += ' --ci';
    if (isWatch) cmd += ' --watch';
    if (jestConfigPath && existsSync(jestConfigPath)) {
      cmd += ` --config ${jestConfigPath}`;
    }
    cmd += ` --rootDir ${cwd}`;

    // Filter args
    // ...

    const tsconfigTestPath = `${cwd}/tsconfig.test.json`;
    const hasTsconfigTest = existsSync(tsconfigTestPath);
    if (hasTsconfigTest) cmd = `JEST_TSCONFIG=${tsconfigTestPath} ${cmd}`;
    const stdio = isSilent ? ['inherit', 'ignore', 'ignore'] : 'inherit';
    if (isWatch) {
      await shell(cmd, { ctx });
    } else {
      try {
        await shell(cmd, { ctx, stdio });
      } catch (err) {
        if (!isSilent) throw err;
        log.fatal('test:jest', omit(err, ['proc']));
        await shell(cmd, { ctx });
      }
    }
  },
});
