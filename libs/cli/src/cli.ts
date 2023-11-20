#!/usr/bin/env node
import { findCommands } from '@macrobe/run';
import { InfoCommand, RunCommand } from '@macrobe/run/commands';
import yargs from 'yargs';

const commands = [
  InfoCommand,
  RunCommand,
  ...(await findCommands({
    exts: ['.sh', '.js', '.cjs', '.mjs', '.ts', '.cts', '.mts'],
    nodemodules: true,
    local: true,
  })),
];

export default yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command(commands)
  .demandCommand()
  .alias('h', 'help')
  .help('h')
  .completion('completion', (current, argv, done) => {
    const completions = commands.map((c: any) => c.command.split(' ')[0]).filter(Boolean);
    done(completions);
  }).argv;
