import fs from 'fs';

import { getPaths } from './getPaths.js';
import { FindPathParams } from './types.js';

export const findPaths = (params: FindPathParams): string[] => {
  // eslint-disable-next-line no-param-reassign
  if (typeof params === 'string') params = { name: params };
  const paths = getPaths(params);
  return paths.filter((p) => fs.existsSync(p));
};
