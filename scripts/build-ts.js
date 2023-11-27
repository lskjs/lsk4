#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';

import { createCommand, findBin, getCwdInfo, isCI, isDev, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'build:ts [-w][-p][-s][-e]',
  describe: 'Build TS project',
  builder: (yargs) =>
    yargs.options({
      watch: {
        alias: 'w',
        describe: 'Monitors files for changes.',
        type: 'boolean',
        default: false,
      },
      prod: {
        alias: 'p',
        describe: 'Enables production mode. Optimization increases build time.',
        type: 'boolean',
        default: false,
      },
      silent: {
        alias: 's',
        describe: 'Limits output to only critical errors.',
        type: 'boolean',
        default: false,
      },
      exec: {
        alias: 'e',
        describe: 'Executes specified command after compilation.',
        type: 'boolean',
        default: false,
      },
    }),

  meta: import.meta,
  async main({ isRoot, ctx, cwd, log, argv } = {}) {
    if (isRoot) {
      await shellParallel(`ycmd build:ts`, { ctx, argv });
      return;
    }
    const { prod: isProd = !isDev, silent: isSilent = isCI, watch: isWatch = false } = argv;
    const { exec: isExec = isWatch && (await getCwdInfo({ cwd })).isApp } = argv;

    // https://tsup.egoist.dev/#minify-output
    let cmd = '';
    if (isExec) {
      const path = 'src/**';
      const ext = 'ts,tsx,js,jsx,mjs,cjs,json';
      cmd = findBin('ts-node');
      cmd += ' src';
      // cmd += ' src/index.ts';
      log.trace('watching path:', path);
      log.trace('watching extensions:', ext);
      log.debug('to restart at any time, enter `rs`');
      // 'nodemon --watch "src/**" --ext "ts,json" --ignore "src/**/*.spec.ts" --exec "ts-node src/index.ts"';
      cmd = `nodemon --watch "${path}" --ext "${ext}" --exec "${cmd}" --quiet`;
    } else {
      cmd = findBin('tsup');
      cmd += ' src';
      // if (isSilent) cmd += ' --silent';
      if (isWatch) cmd += ' --watch';
    }
    const env = { ...process.env };
    if (isProd) env.NODE_ENV = 'production';

    setTimeout(() => {
      writeFile(`${cwd}/cjs/package.json`, JSON.stringify({ type: 'commonjs' }, null, 2));
      writeFile(`${cwd}/lib/package.json`, JSON.stringify({ type: 'module' }, null, 2));
    }, 1000);
    await shell(cmd, { ctx, env, silence: isSilent ? 'all' : false }).catch(async (err) => {
      if (!isSilent) throw err;
      log.error('Error while running', cmd);
      await shell(cmd, { ctx, env });
    });
  },
});
