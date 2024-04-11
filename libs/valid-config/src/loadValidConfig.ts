import type { LoadConfigOptions } from '@lsk4/config';
import { loadConfig } from '@lsk4/config';
import { Err } from '@lsk4/err';
import { z } from 'zod';

import { log } from './log.js';
import { LoadValidConfigOptions, LoadValidConfigResult } from './types.js';

export async function loadValidConfig<T>(
  name: string,
  options: LoadValidConfigOptions<T>,
): Promise<LoadValidConfigResult<T>> {
  const { schema, ...other } = options;
  const res = await loadConfig<T>(name, { ...other, throwError: true });

  if (!options.schema) return res;

  const result = options.schema.safeParse(res.config);
  if (!result.success) {
    log.error('Invalid config', [name, res.path].filter(Boolean).join(':'));
    result.error.errors.forEach((err) => {
      log.warn([err.path, err.message].filter(Boolean).join(' ')); 
    });
    log.trace('Invalid config error', result.error);
    throw new Err('invalidConfig', { data: result });
  }
  return {
    ...res,
    raw: res.config,
    config: result.data,
  };
}
