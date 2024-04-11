import type { ZodType } from "zod";

export interface LoadConfigOptions<T> {
  cwd?: string;
  files?: string[];
  exts?: string[];
  stopDir?: string;
  throwError?: boolean;
  silent?: boolean;
  packageKey?: string;
  processEnvKey?: string;
  schema?: ZodType<T>;
}

