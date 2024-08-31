import { omitNull } from '@lsk4/algos';
import { getEnvVar, isClient, isDev } from '@lsk4/env';

import { parseNs } from './utils/parseNs.js';

export const defaultFormat = isDev || isClient ? 'pretty' : 'lsk';
const safeProcess = typeof process !== 'undefined' ? process : null;

const isYes = (v: string | undefined | null): boolean => Boolean(+(v as any));

export const getEnvConfig = () => {
  const debug = getEnvVar('DEBUG', '') || '';
  // NOTE: тупое говно тупого говна, увы, надо переделать
  const isSilent = isYes(getEnvVar('LSK_SILENT')) || safeProcess?.argv?.includes('--silent');
  const isTrace = debug.startsWith('lsk') || debug.startsWith('*');
  const format = getEnvVar('LOG_FORMAT', getEnvVar('DEBUG_FORMAT', defaultFormat));
  const { on, off } = parseNs(debug);
  // eslint-disable-next-line no-nested-ternary
  const defaultLevel = isSilent ? 'error' : isTrace ? 'trace' : 'debug';
  const level = getEnvVar('LOG_LEVEL', getEnvVar('DEBUG_LEVEL', defaultLevel));
  const res = omitNull({
    format,
    level,
    on,
    off,
  })
  return res as Partial<{
    format: string;
    level: string;
    on: RegExp[];
    off: RegExp[];
}>
};

export default getEnvConfig;
