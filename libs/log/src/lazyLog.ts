import { Logger } from '@lsk4/log';

const loggers: Record<string, Logger> = {};
export const lazyLog = (ns: string = '') => {
  if (!loggers[ns]) loggers[ns] = new Logger(ns);
  return loggers[ns];
};
