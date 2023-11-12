#!/usr/bin/env node
const { run, shell, findBin, shellParallel, getCwdInfo } = require('@lskjs/cli-utils');
const { isCI, isDev } = require('@lskjs/env');
const { existsSync } = require('fs');

const omit = (obj, keys) => {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
};

const main = async ({ isRoot, cwd, ctx, args, log } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:jest', { ctx, args });
    return;
  }
  const isCoverage = args.includes('--coverage');
  const isWatch = args.includes('--watch');
  const isProd = !isDev || !!process.env.LSK_PROD || args.includes('--prod');
  const isSilent = !!+process.env.LSK_SILENT || args.includes('--silent') || isCI;
  let cmd = findBin('uvu');
  const { rootPath } = getCwdInfo({ cwd });
  if (isSilent) cmd += ' --ci';
  if (isCoverage) cmd += `c8 --include=src ${cmd}`;
  if (isWatch) cmd = `watchlist src tests -- ${cmd}`;

  //   if (isProd || isSilent) cmd += ' --silent';

  const stdio = isSilent ? ['inherit', 'ignore', 'ignore'] : 'inherit';
  if (isWatch) {
    await shell(cmd, { ctx });
  } else {
    try {
      await shell(cmd, {
        ctx,
        stdio,
      });
    } catch (err) {
      if (!isSilent) throw err;
      // console.error('test:jest', err);
      log.fatal('test:jest', omit(err, ['proc']));
      await shell(cmd, { ctx });
    }
  }
};

module.exports = run(main);
