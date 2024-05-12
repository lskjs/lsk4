import { isPlainObject, omit } from '@lsk4/algos';
import { Err } from '@lsk4/err';
import { stringify as jsStringify } from 'javascript-stringify';

import { getCommentString } from './getCommentString.js';
import { jsonToYaml } from './jsonToYaml.js';
import type { FileFormat } from './types.js';
import { envStringify } from './utils/envStringify.js';
import { getFileFormat } from './utils/getFileFormat.js';

export type JsonToStringOptions = {
  format?: FileFormat;
  comment?: string;
  indent?: number;
};

export function jsonToString(
  json: any,
  { format: initFormat, comment = '', indent = 2 }: JsonToStringOptions = {},
) {
  const format = getFileFormat(initFormat);
  if (!format) throw new Err('emptyFormat');
  const commentString = getCommentString(comment, { format }) || null;
  if (format === 'env') {
    return [
      //
      commentString,
      envStringify(json),
    ]
      .filter(Boolean)
      .join('\n');
  }
  if (format === 'json') {
    if (isPlainObject(json)) {
      // eslint-disable-next-line no-param-reassign
      json = {
        __comment__: `\n${commentString}\n`,
        ...json,
      };
    }
    return JSON.stringify(json, null, indent);
  }
  if (format === 'yml') {
    let yamlObject;
    const footer = json.__raw;
    if (Array.isArray(json)) {
      yamlObject = json;
    } else {
      yamlObject = omit(json, ['__raw']);
    }
    return [
      commentString,
      jsonToYaml(yamlObject, {
        indent,
        noRefs: true,
      }),
      footer,
    ]
      .filter(Boolean)
      .join('\n');
  }

  const moduleExports = format === 'esm' ? 'export default' : 'module.exports =';

  return [
    commentString,
    '/* eslint-disable prettier/prettier */',
    `${moduleExports} ${jsStringify(json, null, indent)};`,
  ]
    .filter(Boolean)
    .join('\n');
}

export default jsonToString;
