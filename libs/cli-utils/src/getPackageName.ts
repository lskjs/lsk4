import { getRootPath } from './getRootPath.js';
import { CwdParams } from './types.js';

export const getPackageName = ({ cwd }: CwdParams): string => {
  const rootPath = getRootPath({ cwd }) || cwd;
  const packageName = cwd.substr(rootPath.length + 1);
  return packageName;
};
