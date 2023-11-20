// eslint-disable-next-line no-console
/* eslint-disable no-console */
// import { getLogo, printInfo } from '@macrobe/cli-utils/lib/helpers/index.js';
import { executable } from '@macrobe/run';

export default executable({
  command: 'test-yargs-js [--prod] [--silent]',
  aliases: ['s'],
  describe: 'Check size of your JS files',
  // builder: (yargs) => yargs.default('value', 'true'),
  // handler: (args) => {
  //   console.log({ args });
  // },
  main: (props) => {
    console.log({ props });
  },
});

// #!/usr/bin/env node
// const { isCI, isDev } = require('@lskjs/env');
// const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');

// const main = async ({ isRoot, ctx, cwd, args, log } = {}) => {
//   if (isRoot) {
//     await shellParallel('lsk run test:size-limit', { ctx });
//     return;
//   }
//   // eslint-disable-next-line import/no-dynamic-require
//   if (!require(`${cwd}/package.json`)['size-limit']) {
//     log.debug('[skip] size-limit rc not found');
//     return;
//   }
//   const isProd = !isDev || !!+process.env.LSK_PROD || args.includes('--prod');
//   const isSilent = !!+process.env.LSK_SILENT || args.includes('--silent') || isCI;
//   let cmd = findBin('size-limit');
//   if (isProd || isSilent) cmd += ' --silent';
//   await shell(cmd, { ctx });
// };

// module.exports = run(main);
