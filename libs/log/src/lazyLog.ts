import { createLogger } from './createLogger.js';
import type { ILogger } from './types.js';

interface LazyLogFunction {
  (ns?: string): ILogger;
  loggers: Record<string, ILogger>;
  trace: ILogger['trace'];
  debug: ILogger['debug'];
  info: ILogger['info'];
  warn: ILogger['warn'];
  error: ILogger['error'];
  fatal: ILogger['fatal'];
}

const lazyLoggers: Record<string, ILogger> = {};
export const lazyLog = function (ns: string = ''): ILogger {
  if (!lazyLoggers[ns]) lazyLoggers[ns] = createLogger(ns);
  return lazyLoggers[ns];
} as LazyLogFunction;

lazyLog.loggers = lazyLoggers;
const lazy = lazyLog();
lazyLog.trace = lazy.trace.bind(lazy);
lazyLog.debug = lazy.debug.bind(lazy);
lazyLog.info = lazy.info.bind(lazy);
lazyLog.warn = lazy.warn.bind(lazy);
lazyLog.error = lazy.error.bind(lazy);
lazyLog.fatal = lazy.fatal.bind(lazy);
