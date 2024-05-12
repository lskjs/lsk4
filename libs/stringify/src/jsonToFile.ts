// import { isEqual } from '@lskjs/algos';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { Err } from '@lsk4/err';
import { lazyLog } from '@lsk4/log';

import { jsonToString } from './jsonToString';
import type { FileFormat } from './types';
import { getFileFormat } from './utils/getFileFormat';
import { guessFileFormat } from './utils/guessFileFormat';
import { importFile } from './utils/importFile';
import { isEqualObjects } from './utils/isEqualObjects';

export type JsonToFileOptions = {
  format?: FileFormat;
  comment?: string;
  compare?: boolean;
};

export type JsonToFileResult = {
  status: 'created' | 'updated' | 'nochanges';
};

export async function jsonToFile(
  filename: string,
  json: Record<string, unknown>,
  { format: initFormat = null, comment = '', compare = true } = {},
) {
  const format = initFormat ? getFileFormat(initFormat) : guessFileFormat(filename);
  if (!format) throw new Err('cantGuessFormat', { data: { filename } });
  const isExists = existsSync(filename);
  if (compare && isExists) {
    try {
      const data = await importFile(filename, { format });
      if (isEqualObjects(json, data)) {
        // console.log('isEqual', filename);
        return { status: 'nochanges' };
      }
    } catch (err) {
      lazyLog('stringify').trace('jsonToFile compare error', err);
    }
  }
  await mkdir(path.dirname(filename), { recursive: true });

  await writeFile(filename, jsonToString(json, { format, comment }));
  return { status: isExists ? 'updated' : 'created' };
}

export default jsonToFile;
