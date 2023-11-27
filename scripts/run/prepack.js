#!/usr/bin/env node
const { run, shell, shellParallel, findBin } = require('@lskjs/cli-utils');
const { readdir } = require('fs/promises');

const main = async ({ args, isRoot, ctx, cwd } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run prepack', { ctx, args });
    return;
  }
  await shell('rm -rf .release', { ctx, silence: 1 });
  // await shell('lsk run fix --workspace');
  let cmd = findBin('clean-publish');
  const files = await readdir(cwd);
  // eslint-disable-next-line import/no-dynamic-require
  const package = require(`${cwd}/package.json`);
  cmd += ' --without-publish --temp-dir .release --fields "//, ///, ////, private"';
  if (package.files?.length) {
    const packageFiles = package.files || [];
    packageFiles.push('package.json');
    const removedFiles = files.filter((f) => !packageFiles.includes(f));
    cmd += ` --files "${removedFiles}"`;
  }

  await shell(cmd, { ctx });
};

module.exports = run(main);
