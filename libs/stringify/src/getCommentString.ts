import type { FileFormat } from './types.js';
import { getFileFormat } from './utils/getFileFormat.js';

export type GetCommentStringOptions = {
  format?: FileFormat;
};

export function getCommentString(
  str: string,
  { format: initFormat }: GetCommentStringOptions = {},
) {
  const format = getFileFormat(initFormat || 'json');
  if (format === 'json' || format === 'cjs' || format === 'esm') {
    return [
      '/**',
      str
        .split('\n')
        .map((s) => [' *', s].filter(Boolean).join(' '))
        .join('\n'),
      ' */',
    ].join('\n');
  }
  return [
    '##',
    str
      .split('\n')
      .map((s) => ['##', s].filter(Boolean).join(' '))
      .join('\n'),
    '##',
  ].join('\n');
}

export default getCommentString;
