import { getFileFormat } from './getFileFormat.js';

export type ImportFileOptions = {
  format?: string;
};

function getExt(filename: string) {
  return filename.split('.').pop();
}

export function guessFileFormat(filename: string) {
  const ext = getExt(filename);
  if (['json', 'yml', 'yaml', 'ts', 'js', 'cjs', 'mjs', 'env'].includes(ext || '')) {
    return getFileFormat(ext || '');
  }
  return null;
}
