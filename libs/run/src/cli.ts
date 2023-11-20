#!/usr/bin/env node
import { onFail } from '@macrobe/cli-utils';
import yargs from 'yargs';

import { InfoCommand } from './commands/InfoCommand.js';
import { RunCommand } from './commands/RunCommand.js';

export default yargs(process.argv.slice(2))
  // .strict()
  // .scriptName('lskrun')
  .usage('Usage: $0 <command> [options]')
  .command(InfoCommand)
  .command(RunCommand)
  .fail(onFail)
  .demandCommand()
  .alias('h', 'help')
  .help('h')
  .completion()
  .getCompletion([], (completions) => {
    console.log(completions);
  }).argv;
