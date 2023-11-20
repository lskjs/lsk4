export interface CwdParams {
  cwd: string;
}

export interface CwdInfo {
  name: string | null;
  isRoot: boolean;
  rootPath: string | null;
  isJs: boolean;
  isBabel: boolean;
  isTs: boolean;
  isLib: boolean;
  isApp: boolean;
  isNest: boolean;
  isNext: boolean;
}

export type FindPathParams = { name?: string } | string;

export interface GetPathsParams {
  cwd?: string;
  name?: string;
  lskrc?: boolean;
  exts?: string[];
}

export interface LskrcConfig {
  path?: string;
  rootPath?: string | null;
  [key: string]: any; // Additional properties of the config
}

export interface Logger {
  // (...args: any[]): void;
  fatal(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  trace(...args: any[]): void;
}
