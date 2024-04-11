import path from 'node:path';

import { Err } from '@lsk4/err';
// @ts-ignore it can't find types, but module has types
import JoyCon from 'joycon';

import { allowedExtensions, defaultExtensions } from './options';
import type { LoadConfigOptions } from './types.js';
import { bundleRequireSync } from './utils/bundleRequireSync';
import { loadJsoncSync } from './utils/loadJsoncSync';
import { checkSchema } from './checkSchema';
import { lazyLog } from './log';

// NOTE: это копипаста из соседнего файла loadConfig.ts, но синхронная версия. Изменять нужно оба файла.

export function loadConfigSync<T>(
  name: string,
  options: LoadConfigOptions<T> & { throwError?: true },
): { path: string; config: T };
export function loadConfigSync<T>(name: string): { path: string; config: T };
export function loadConfigSync<T>(
  name: string,
  options: LoadConfigOptions<T> & { throwError: false },
): { path?: string; config?: T };

export function loadConfigSync<T>(
  name: string = '.env',
  {
    cwd = process.cwd(),
    files: initFiles = [],
    exts = defaultExtensions,
    stopDir,
    throwError = true,
    silent = false,
    packageKey = '',
    processEnvKey = '',
    schema,
  }: LoadConfigOptions<T> = {},
): { path?: string; config?: T } {
  try {
    const configJoycon = new JoyCon();
    const filteredExts = exts.filter((ext) => allowedExtensions.some((e) => ext.endsWith(e)));

    let files = initFiles;
    if (files.length === 0) {
      files = filteredExts.map((ext) => name + ext);
      if (packageKey) files.push('package.json');
    }

    const configPath = configJoycon.resolveSync({
      files,
      cwd,
      stopDir: stopDir || path.parse(cwd).root,
      packageKey,
    });

    const processEnvValue = process.env[processEnvKey];
    const processEnvPath = `process.env.${processEnvKey}`;

    const isProcess = typeof processEnvValue === 'string';
    const isJson = configPath && configPath.endsWith('.json');
    const isRequire = configPath && !isJson;

    // js,.ts,.cjs,.mjs
    if (isRequire) {
      const { mod: config } = bundleRequireSync<any>({
        filepath: configPath,
      });
      const raw = config; // config.mod
      const res = {
        path: configPath,
        config: raw[packageKey] || raw.default || raw,
      };
      if (schema) return checkSchema<T>(res as any, { schema, throwError, silent });
      return res;
    }
    // json, package.json
    if (isJson) {
      let data = loadJsoncSync(configPath);
      if (packageKey && configPath.endsWith('package.json')) {
        data = packageKey ? data[packageKey] : undefined;
      }
      if (data) {
        const res = { path: configPath, config: data };
        if (schema) return checkSchema<T>(res as any, { schema, throwError, silent });
        return res;
      }
    }
    if (isProcess) {
      const res = {
        path: processEnvPath,
        config: JSON.parse(processEnvValue),
      };
      if (schema) return checkSchema<T>(res as any, { schema, throwError, silent });
      return res;
    }
    throw new Err(`Config not found: ${name}`);
  } catch (err) {
    if (throwError) throw err;
    // TODO: replace to lsk4/log/log, but now it doesn't compile dts
    if (!silent) lazyLog().warn('[loadConfig]', err);
  }
  return {};
}
