import path from 'path';

import { isWorkspaceRoot } from './isWorkspaceRoot.js';
import { CwdParams } from './types.js';

export const getRootPath = ({ cwd: packageCwd }: CwdParams): string | null => {
  let cwd = packageCwd;
  for (let i = 0; i < 10; i += 1) {
    if (isWorkspaceRoot({ cwd })) return cwd;
    cwd = path.resolve(`${cwd}/..`);
    if (cwd === '/') return null;
  }
  return null;
};
