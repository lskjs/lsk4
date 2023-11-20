import { spawn } from '@macrobe/spawn';

import { pathexec } from './pathexec.js';
import { ShellOptions } from './types.js';

export function shell(command: string, options: ShellOptions = {}): Promise<any> {
  if (command.startsWith('lsk run ')) {
    return pathexec(command.slice('lsk run '.length), options);
  }
  if (command.startsWith('lsk ')) {
    return pathexec(command.slice('lsk '.length), options);
  }
  if (command.startsWith('macrobe ')) {
    return pathexec(command.slice('macrobe '.length), options);
  }
  const { args = [], ...other } = options;
  return spawn(command, args, {
    shell: true,
    // stdio: ['pipe', 'inherit', 'inherit'],
    ...other,
  });
}
