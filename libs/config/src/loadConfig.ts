import path from 'node:path';

import { Err } from '@lsk4/err';
import { Logger } from '@lsk4/log';
// @ts-ignore it can't find types, but module has types
import { bundleRequire } from 'bundle-require';
import JoyCon from 'joycon';

import { isCommonJS } from './isCommonJS';
import { loadJsonc } from './loadJsonc';
import type { LoadConfigParams } from './types.js';

const allowedExtensions = ['.ts', '.json', '.cjs', '.mjs', '.js'];

const defaultExtensions = allowedExtensions.filter((ext) => {
  if (isCommonJS()) return ext !== '.mjs';
  return true;
});

export async function loadConfig<T>(
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
  }: LoadConfigParams = {},
): Promise<{ path?: string; config?: T }> {
  try {
    const configJoycon = new JoyCon();
    const filteredExts = exts.filter((ext) => allowedExtensions.some((e) => ext.endsWith(e)));

    let files = initFiles;
    if (files.length === 0) {
      files = filteredExts.map((ext) => name + ext);
      if (packageKey) files.push('package.json');
    }

    const configPath = await configJoycon.resolve({
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
      const { mod: config } = await bundleRequire({
        filepath: configPath,
      });
      const raw = config; // config.mod
      return {
        path: configPath,
        config: raw[packageKey] || raw.default || raw,
      };
    }
    // json, package.json
    if (isJson) {
      let data = await loadJsonc(configPath);
      if (packageKey && configPath.endsWith('package.json')) {
        data = packageKey ? data[packageKey] : undefined;
      }
      if (data) {
        return { path: configPath, config: data };
      }
    }
    if (isProcess) {
      return {
        path: processEnvPath,
        config: JSON.parse(processEnvValue),
      };
    }
    throw new Err(`Config not found: ${name}`);
  } catch (err) {
    if (throwError) throw err;
    // TODO: replace to lsk4/log/log, but now it doesn't compile dts
    if (!silent) new Logger().warn('[loadConfig]', err);
  }
  return {};
}
