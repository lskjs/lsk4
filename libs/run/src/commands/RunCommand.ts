import { CommandModule } from 'yargs';

import { pathexec } from '../pathexec.js';

export const RunCommand: CommandModule = {
  command: 'run',
  describe: 'Run subcomand ',
  handler: async (argv: any) => {
    const [cmd, ...args] = process.argv.slice(3);
    // console.log({ argv, args }, cmd);
    // let res
    try {
      // const res = await run(() => pathexec(cmd, { args }));
      const res = await pathexec(cmd, { args });
      // console.log('[res]', res);
    } catch (err) {
      // console.log('[err3]', err);
      throw err;
    }
  },
};
