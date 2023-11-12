/* eslint-disable import/no-dynamic-require */
import { existsSync } from 'fs';

import { getPackageName } from './getPackageName.js';
import { getRootPath } from './getRootPath.js';
import { isWorkspaceRoot } from './isWorkspaceRoot.js';
import { CwdInfo, CwdParams } from './types.js';

export const getCwdInfo = ({ cwd }: CwdParams): CwdInfo => {
  const isBabel = existsSync(`${cwd}/.babelrc.js`) || existsSync(`${cwd}/.babelrc`);
  const isTs = existsSync(`${cwd}/tsconfig.json`);
  const isApp =
    existsSync(`${cwd}/Dockerfile`) ||
    existsSync(`${cwd}/docker-stack.yml`) ||
    existsSync(`${cwd}/k8s.yml`);
  const isLib = !isApp;
  const isNest = existsSync(`${cwd}/nest-cli.json`);
  const isNext = existsSync(`${cwd}/next.config.mjs`) || existsSync(`${cwd}/next.config.js`);

  return {
    name: getPackageName({ cwd }) || null,
    isRoot: isWorkspaceRoot({ cwd }),
    rootPath: !isWorkspaceRoot({ cwd }) ? getRootPath({ cwd }) : null,
    isJs: !isBabel && !isTs,
    isBabel,
    isTs,
    isLib,
    isApp,
    isNest,
    isNext,
  };
};

// export { isRoot, getRootPath, isPackage, getPackageName, getCwdInfo };
