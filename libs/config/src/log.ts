import { Logger } from '@lsk4/log';

let logger: Logger;
export const lazyLog = () => {
  if (!logger) logger = new Logger('config');
  return logger;
};
