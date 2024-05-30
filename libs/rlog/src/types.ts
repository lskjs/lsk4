export type RlogOptions = {
  url?: string;
  token?: string;

  ns?: string;
  level?: string;
  logLevel?: string;
};

export type RlogLogLevels = 'error' | 'warn' | 'info' | 'debug' | 'trace';
export type RlogSendData = string; // TODO: Error

export type RlogSendOptions = {
  type?: 'text' | 'md' | 'html';
  level?: RlogLogLevels;
  ns?: string;

  throw?: boolean | number;
};
