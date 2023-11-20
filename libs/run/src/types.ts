import type { Logger } from '@macrobe/cli-utils';
import { LskrcConfig } from '@macrobe/cli-utils';
import type { SpawnOptions } from '@macrobe/spawn';
import { ArgumentsCamelCase, CommandBuilder } from 'yargs';

export type Ctx = any;
export interface CtxOptions {
  isRoot: boolean;
  ctx: Ctx;
  cwd: string;
  args: string[];
  log: Logger;
  config: LskrcConfig;
}

export interface RootRun extends CtxOptions {
  shell: string;
  filename: string;
}

export interface PathexecCtx {
  rootRun: RootRun;
}

export type PathexecProcess = typeof process & { pathexec?: PathexecCtx };
export type LskrunProcess = typeof process & { lskrun?: RootRun };

export interface MainOptions {
  rootRun?: RootRun;
  args?: string[];
  [key: string]: any; // Additional properties
}

export interface ShellOptions extends SpawnOptions {
  args?: string[];
}

export interface PathexecOptions extends SpawnOptions {
  args?: string[];
  log?: any; // Replace 'any' with the actual type of your logger
  ctx?: any; // Replace 'any' with the actual type of your context
  name?: string;
}

export type MainFunction = (props: MainOptions) => Promise<any>;

// eslint-disable-next-line @typescript-eslint/ban-types
export interface MainCommand<T = {}, U = {}> {
  /** array of strings (or a single string) representing aliases of `exports.command`, positional args defined in an alias are ignored */
  aliases?: ReadonlyArray<string> | string | undefined;
  /** object declaring the options the command accepts, or a function accepting and returning a yargs instance */
  builder?: CommandBuilder<T, U> | undefined;
  /** string (or array of strings) that executes this command when given on the command line, first string may contain positional args */
  command: ReadonlyArray<string> | string | undefined;
  /** boolean (or string) to show deprecation notice */
  deprecated?: boolean | string | undefined;
  /** string used as the description for the command in help text, use `false` for a hidden command */
  describe?: string | false | undefined;
  /** a function which will be passed the parsed argv. */
  handler?: (args: ArgumentsCamelCase<U>) => void | Promise<void>;

  main?: MainFunction;
}
