#!/usr/bin/env node
import { getComment, jsonToFile } from '@lskjs/stringify';
import { createCommand, getShortPath, isFileExist, shell, shellParallel } from 'ycmd';

export default createCommand({
  command: 'build:gitlab-ci',
  describe: 'Generate GitLab CI configurations',

  meta: import.meta,
  async main({ isRoot, log, ctx, cwd, config } = {}) {
    if (isRoot) {
      await shellParallel(`ycmd build:gitlab-ci`, { ctx });
      await shell('ycmd build:gitlab-ci', { ctx, cwd: `${cwd}/apps` });
      await shell('ycmd build:gitlab-ci', { ctx, cwd: `${cwd}/libs` });
    }
    const { rootRepo, packages, rootPath } = config;
    const packagePath = cwd.replace(`${rootPath}/`, '').replace(rootPath, '');
    let name = packagePath.split('/').reverse()[0];
    if (name === 'packages' || name === 'apps' || cwd === rootPath) {
      name = null;
    }
    const inputFilename = `${packagePath}/.gitlab-ci.js`;
    const outputFilename = `${packagePath}/.gitlab-ci.yml`;
    if (!(await isFileExist(`${rootPath}/${inputFilename}`))) {
      log.trace('[skip]', getShortPath(inputFilename));
      return;
    }

    const getConfig = (await import(`${rootPath}/${inputFilename}`)).default;
    const data = getConfig({
      packages: name ? [{ name, path: packagePath }] : packages,
    });
    log.trace('[save]', ` ${getShortPath(inputFilename)} => ${getShortPath(outputFilename)}`);
    await jsonToFile(`${rootPath}/${outputFilename}`, data, {
      type: 'yml',
      comment: getComment({
        name: inputFilename,
        url: `${rootRepo}/${inputFilename}`,
      }),
    });
  },
});
