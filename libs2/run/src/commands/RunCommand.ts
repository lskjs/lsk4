import { CommandModule } from 'yargs';

import { pathexec } from '../pathexec.js';
import { run } from '../run.js';

export const RunCommand: CommandModule = {
  command: 'run',
  describe: 'Run subcomand ',
  handler: async (argv: any) => {
    const [cmd, ...args] = process.argv.slice(3);
    console.log({ argv, args }, cmd);
    await run(() => pathexec(cmd, { args }));
  },
};
