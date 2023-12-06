import path from 'node:path';

import { Logger } from '@lsk4/log';
// @ts-ignore it can't find types, but module has types
import { bundleRequire } from 'bundle-require';
import JoyCon from 'joycon';

import { loadJsonc } from './loadJsonc';
import type { LoadConfigParams, LskrcConfig } from './types.js';

const joycon = new JoyCon();

const jsonLoader = {
  test: /\.json$/,
  load(filepath: string) {
    return loadJsonc(filepath);
  },
};

joycon.addLoader(jsonLoader);

const allowedExtensions = ['.ts', '.js', '.cjs', '.mjs', '.json', 'package.json'];

export async function loadConfig(
  name: string = '.env',
  {
    cwd = process.cwd(),
    exts = allowedExtensions,
    stopDir,
    throwError = true,
    packageKey = '',
    processEnvKey = '',
  }: LoadConfigParams = {},
): Promise<{ path?: string; config?: LskrcConfig }> {
  try {
    const configJoycon = new JoyCon();
    let configPath = await configJoycon.resolve({
      files: exts
        .filter((ext) => allowedExtensions.some((extension) => ext.endsWith(extension)))
        .map((ext) => {
          if (ext === 'package.json') return ext;
          return name + ext;
        }),
      cwd,
      stopDir: stopDir || path.parse(cwd).root,
      packageKey,
    });

    const processEnvValue = process.env[processEnvKey];
    const processEnvPath = `process.env.${processEnvKey}`;
    const hasProcessEnvValue = typeof processEnvValue === 'string';

    if (configPath) {
      if (configPath.endsWith('.json')) {
        let data = await loadJsonc(configPath);
        if (configPath.endsWith('package.json')) {
          data = packageKey ? data[packageKey] : undefined;
        }
        if (!data && hasProcessEnvValue) {
          data = JSON.parse(processEnvValue);
          configPath = processEnvPath;
        }
        if (data) {
          return { path: configPath, config: data };
        }
        return {};
      }

      const { mod: config } = await bundleRequire({
        filepath: configPath,
      });

      const raw = config; // config.mod
      return {
        path: configPath,
        config: raw[packageKey] || raw.default || raw,
      };
    }
    if (hasProcessEnvValue) {
      return {
        path: processEnvPath,
        config: JSON.parse(processEnvValue),
      };
    }
  } catch (err) {
    if (throwError) throw err;
    // replace to lsk4/log, but now it doesn't compile dts
    new Logger().warn('[loadConfig]', err);
  }
  return {};
}
