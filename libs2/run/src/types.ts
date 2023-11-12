import { Logger, LskrcConfig } from '@macrobe/cli-utils';
import { SpawnOptions } from '@macrobe/spawn';

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
