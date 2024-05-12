import { createLogger } from './createLogger.js';
import type { ILogger } from './types.js';

const loggers: Record<string, ILogger> = {};
export const lazyLog = (ns: string = '') => {
  if (!loggers[ns]) loggers[ns] = createLogger(ns);
  return loggers[ns];
};
