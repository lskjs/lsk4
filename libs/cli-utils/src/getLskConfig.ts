/* eslint-disable no-console */
import fs from 'fs';
import ph from 'path';

import { getRootPath } from './getRootPath.js';
import { getShortPath } from './getShortPath.js';
import { log } from './log.js';
import { CwdParams, LskrcConfig } from './types.js';

const rcs: { [key: string]: LskrcConfig } = {};

export const getLskConfig = (options: CwdParams = { cwd: process.cwd() }): LskrcConfig => {
  const { cwd = process.cwd() } = options;

  const paths = [
    ph.resolve(`${cwd}/.lskjs.js`),
    ph.resolve(`${cwd}/.lskjs.json`),
    ph.resolve(`${cwd}/../.lskjs.js`),
    ph.resolve(`${cwd}/../.lskjs.json`),
    ph.resolve(`${cwd}/../../.lskjs.js`),
    ph.resolve(`${cwd}/../../.lskjs.json`),
  ].filter((f) => fs.existsSync(f));

  const path = paths[0];
  if (!path) return {};
  try {
    const raw = require(path); // Note: Dynamic require might need special handling in TypeScript
    const config: LskrcConfig = { path, rootPath: getRootPath({ cwd: path }), ...raw };
    if (!rcs[path]) {
      rcs[path] = config;
      log.trace('[load] lskrc', getShortPath(path));
    }
    return config;
  } catch (error) {
    console.error(`parse .lskjs.js err ${path}`, error);
    return {};
  }
};
