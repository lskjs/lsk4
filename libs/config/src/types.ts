export interface LoadConfigParams {
  cwd?: string;
  exts?: string[];
  stopDir?: string;
  throwError?: boolean;
  packageKey?: string;
  processEnvKey?: string;
}

export interface LskrcConfig {
  path?: string;
  rootPath?: string | null;
  [key: string]: any; // Additional properties of the config
}
