// import { isEqual } from '@lskjs/algos';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { fileToJson } from './fileToJson';
import { jsonToString } from './jsonToString';

const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

export async function jsonToFile(
  filename: string,
  json: Record<string, unknown>,
  { type = 'keyval', comment = '', compare = true } = {},
) {
  const data = await fileToJson(filename, { type });
  if (compare && isEqual(json, data)) {
    // // eslint-disable-next-line no-console
    // console.log('isEqual', filename);
    return { status: 'no-changes' };
  }
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, jsonToString(json, { type, comment }));
  return { status: 'updated' };
}

export default jsonToFile;
