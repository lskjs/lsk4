import type { LoadConfigOptions } from '@lsk4/config';
import { z } from 'zod';

export interface LoadValidConfigOptions<T> extends LoadConfigOptions {
  schema?: z.ZodType<T>;
}

export interface LoadValidConfigResult<T> {
  path: string;
  config: T;
  raw?: unknown;
}
