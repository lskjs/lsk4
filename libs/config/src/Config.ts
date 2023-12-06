import fs from 'fs';
import JoyCon from 'joycon';
import path from 'path';
// @ts-ignore it can't find types, but module has types
import { bundleRequire } from 'bundle-require';
import { jsoncParse } from './jsoncParse';
import type { LoadConfigParams, LskrcConfig } from './types.js';

const joycon = new JoyCon()

const loadJson = async (filepath: string) => {
  try {
    return jsoncParse(await fs.promises.readFile(filepath, 'utf8'))
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to parse ${path.relative(process.cwd(), filepath)}: ${
          error.message
        }`
      )
    } else {
      throw error
    }
  }
}

const jsonLoader = {
  test: /\.json$/,
  load(filepath: string) {
    return loadJson(filepath)
  },
}

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
    processKey = '',
  }: LoadConfigParams = {},
): Promise<{ path?: string; config?: LskrcConfig }> {
  try {
    const configJoycon = new JoyCon();
    const configPath = await configJoycon.resolve({
      files: 
        exts
        .filter((ext) => allowedExtensions.some((extension) => ext.endsWith(extension)))
        .map((ext) => {
          if (ext === 'package.json') return ext;
          return name + ext;
        }),
      cwd,
      stopDir: stopDir || path.parse(cwd).root,
      packageKey,
    });

    const processEnvValue = process.env[processKey];
    if (typeof processEnvValue === 'string') {
      const envPath = `process.env.${processKey}`;
      const res = JSON.parse(processEnvValue);
      return {
        path: envPath,
        config: res,
      };
    }

    if (configPath) {
      if (configPath.endsWith('.json')) {
        let data = await loadJson(configPath)
        if (configPath.endsWith('package.json') && packageKey) {
          data = data[packageKey];
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
  } catch (err) {
    if (throwError) throw err;
    // replace to lsk4/log, but now it doesn't compile dts
    console.error('[loadConfig]', err);
  }
  return {};
}