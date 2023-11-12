/* eslint-disable no-console */
// import { getLogo, printInfo } from '@macrobe/cli-utils/lib/helpers/index.js';
import fs from 'node:fs';

import { getLogo, printInfo } from '@macrobe/cli-utils/helpers';
import path from 'path';
import { fileURLToPath } from 'url';
import { CommandModule } from 'yargs';

const tryJSONparse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
};
const readJsonSync = (jsonPath: string) => tryJSONparse(fs.readFileSync(jsonPath, 'utf8'));

export const InfoCommand: CommandModule = {
  command: 'info',
  aliases: ['i'],
  describe: 'Get info about current project',
  // builder: (yargs) => yargs.default('value', 'true'),
  handler: () => {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);
    const packageJson = readJsonSync(`${__dirname}/../../package.json`);
    const config = {
      name: packageJson?.name,
      version: packageJson?.version,
    };
    console.log(getLogo());
    printInfo({
      log: (...a: any[]) => console.log(...a),
      config,
    });
  },
};
