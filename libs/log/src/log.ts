import { createLogger } from './createLogger.js';
// import { Logger } from './Logger';

// console.log({ Logger });

// export const log = new Logger('app');
export const log = createLogger();
export default log;
