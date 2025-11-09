import { join } from 'node:path';

import { defaultOptions } from './defaultOptions.js';
import { writeFileAndDir } from './writeFileAndDir.js';

export const writePackageJsonModules = async ({
  cwd,
  libDir = defaultOptions.libDir,
  cjsDir = defaultOptions.cjsDir,
}: {
  cwd: string;
  libDir?: string;
  cjsDir?: string;
}) => {
  // console.log('writePackageJsonModules', { cwd, libDir, cjsDir });
  await Promise.all(
    [
      libDir
        ? writeFileAndDir(
            join(cwd, libDir, 'package.json'),
            JSON.stringify({ type: 'module' }, null, 2),
          )
        : null,
      cjsDir
        ? writeFileAndDir(
            join(cwd, cjsDir, 'package.json'),
            JSON.stringify({ type: 'commonjs' }, null, 2),
          )
        : null,
    ].filter(Boolean),
  );
};
