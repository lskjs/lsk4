import { Err } from '@lsk4/err';

import { lazyLog } from './log.js';
import type { LoadConfigOptions } from './types.js';

const stringify = (arr: any) => (Array.isArray(arr) ? arr.map(String).join('.') : String(arr));

export function checkSchema<T>(
  res: { name: string; path: string; config: T },
  options: LoadConfigOptions<T> = {},
) {
  const { schema, throwError, silent } = options;
  if (!schema) return res;

  const result = schema.safeParse(res.config);
  if (!result.success) {
    if (!silent) {
      lazyLog().error(
        '[checkSchema]',
        'Invalid config',
        `"${[res.name, res.path].filter(Boolean).join(':')}"`,
      );
    }
    result.error.errors.forEach((err) => {
      if (!silent)
        lazyLog().warn(
          '[checkSchema]',
          [stringify(err.path), err.message].filter(Boolean).join(' '),
        );
    });
    if (!silent) lazyLog().trace('[checkSchema]', 'Invalid config error', result.error);
    if (!throwError) {
      return {
        ...res,
        error: result.error,
      };
    }
    throw new Err('invalidConfig', { name: res.name, path: res.path, result });
  }
  return {
    ...res,
    raw: res.config,
    config: result.data,
  };
}
