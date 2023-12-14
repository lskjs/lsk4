import { getEnvConfig } from './getEnvConfig.js';
import { Logger } from './Logger.js';
import type { ILogger } from './types.js';

export const createLogger = (propsOrName = {}, props = {}): ILogger => {
  const cnf = getEnvConfig();
  const prm = {
    ...(typeof propsOrName === 'string' ? { name: propsOrName } : propsOrName),
    ...cnf,
    ...props,
  } as any;
  const name = [prm.ns, prm.name].filter(Boolean).join(':');
  if (prm.on?.some((v: RegExp) => v.test(name))) {
    prm.level = 'trace';
  }
  if (prm.off?.some((v: RegExp) => v.test(name))) {
    prm.level = 'error';
  }
  return new Logger(prm);
};
