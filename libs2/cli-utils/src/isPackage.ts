import { getRootPath } from './getRootPath.js';
import { isWorkspaceRoot } from './isWorkspaceRoot.js';
import { CwdParams } from './types.js';

export const isPackage = ({ cwd }: CwdParams): boolean =>
  !isWorkspaceRoot({ cwd }) && !!getRootPath({ cwd });
