export interface LoadConfigParams {
  cwd?: string,
  exts?: string[],
  stopDir?: string,
  throwError?: boolean,
  packageKey?: string,
  processKey?: string
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