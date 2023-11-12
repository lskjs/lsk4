import fs from 'fs';

import { getPaths } from './getPaths.js';
import { FindPathParams } from './types.js';

export const findPath = (params: FindPathParams = {}): string | null => {
  // eslint-disable-next-line no-param-reassign
  if (typeof params === 'string') params = { name: params };
  const paths = getPaths(params);
  // eslint-disable-next-line no-restricted-syntax
  for (const path of paths) {
    if (fs.existsSync(path)) return path;
  }
  return null;
};
