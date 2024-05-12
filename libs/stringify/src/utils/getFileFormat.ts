import { Err } from '@lsk4/err';

import { FileFormat } from '../types';

export function getFileFormat(format?: string): FileFormat | null {
  if (!format) return null;
  switch (format) {
    case 'json':
      return 'json';
    case 'cjs':
    case 'js':
      return 'cjs';
    case 'esm':
    case 'mjs':
    case 'es6':
    case 'ts':
      return 'esm';
    case 'yml':
    case 'yaml':
      return 'yml';
    case 'env':
    case 'dotenv':
    case 'keyval':
    case 'keyvalue':
      return 'env';
    default:
      throw new Err(`Unsupported file format: ${format}`, { format });
  }
}
