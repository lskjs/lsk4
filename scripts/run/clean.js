#!/usr/bin/env node
const { run, shell, shellParallel } = require('@lskjs/cli-utils');

console.log('clean 123');

const main = async ({ isRoot, ctx, cwd } = {}) => {
  console.log('clean 312', { isRoot, ctx, cwd });
  if (isRoot) {
    await shellParallel('lsk run clean', { ctx });
    return;
  }
  await shell(`rm -rf ${cwd}/coverage ${cwd}/.release`, { ctx });
  // await shell(`rm -rf ${cwd}/lib/* ${cwd}/coverage ${cwd}/.package`, { ctx });
};

// module.exports = run(main);
