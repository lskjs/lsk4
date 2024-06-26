import { existsSync as exists } from 'node:fs';

import { fromPairs } from '@lsk4/algos';
import { Err } from '@lsk4/err';
import { lazyLog } from '@lsk4/log';
import { readFile } from 'fs/promises';
import yaml from 'js-yaml';

import { getFileFormat } from './getFileFormat.js';
import { guessFileFormat } from './guessFileFormat.js';
import { importRequire } from './importRequire.js';

export type ImportFileOptions = {
  format?: string;
  undefault?: boolean;
};

export async function importFile(
  filename: string,
  { format: initFormat, undefault = true }: ImportFileOptions = {},
) {
  const format = initFormat ? getFileFormat(initFormat) : guessFileFormat(filename);
  if (!format) throw new Err('cantGuessFormat', { data: { filename } });
  if (!exists(filename)) return null;
  try {
    if (format === 'cjs' || format === 'esm') {
      const data = await importRequire(filename, { removeCache: true });
      if (undefault && Object.keys(data).length === 1 && Object.keys(data)[0] === 'default')
        return data.default;
      return data;
    }
    const str = (await readFile(filename)).toString();
    // if (format === 'sh') {
    //   const raw = readFile(filename);
    //   return raw.toString().split('\n').map((a) => {
    //     const s = a.trim();
    //     if (s[0] === '#') return null;
    //     return s;
    //   }).join('\n');
    // }
    if (format === 'json') {
      const raw = JSON.parse(str);
      delete raw.__comment__;
      return JSON.parse(str);
    }
    if (format === 'env') {
      if (!str) return [];
      const keyvalues = String(str)
        .split('\n')
        .map((a) => {
          const s = a.trim();
          if (s[0] === '#') return null;
          if (s.indexOf('=') === -1) return null;
          const delimiter = s.indexOf('=');
          const key = s.substr(0, delimiter);
          if (!key) return null;
          const value = s.substr(delimiter + 1);
          return [key, value];
        })
        .filter(Boolean) as [string, string][];
      // console.log({ str, keyvalues });
      return fromPairs(keyvalues);
    }
    if (format === 'yml') {
      return yaml.load(str);
    }
    throw new Err('incorrectFormat', { data: { format } });
  } catch (err) {
    // TODO: обработать ошибку если
    lazyLog('stringify').trace('importFile error', err, { filename, format });
    return null;
  }
}

export default importFile;
