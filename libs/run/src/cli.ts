#!/usr/bin/env node
import yargs from 'yargs';

import { InfoCommand } from './commands/InfoCommand.js';
import { RunCommand } from './commands/RunCommand.js';

export default yargs(process.argv.slice(2))
  .scriptName('lskrun')
  .usage('Usage: $0 <command> [options]')
  .command(InfoCommand)
  .command(RunCommand)
  .demandCommand()
  .alias('h', 'help')
  .help('h').argv;
