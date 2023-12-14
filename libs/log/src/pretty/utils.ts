/* eslint-disable no-nested-ternary */
import { colorize } from '@lsk4/colors';
import { getEnvVar } from '@lsk4/env';
import { Err } from '@lsk4/err';
import _prettyBytes from 'pretty-bytes';
import _prettyTime from 'pretty-time';

import { contentColors } from '../config.js';
import { cross, info, lineCross, warning } from '../figures/figures';
import { themeize, themeizeLight, themeizeRandom } from '../themeize.js';
import { LoggerLevelType } from '../types.js';
import { hashCode } from '../utils/hashCode.js';
import { isLsklogWebFinal } from './formats/lsklog.js';

const LOG_VIEW = getEnvVar('LOG_VIEW', 'emoji');

const leftPad = (str: string, length: number) => String(str).padStart(length);
const rightPad = (str: string, length: number) => String(str).padEnd(length);

let prettyPathLength = 20;
export const prettyPath = (url: string, defaultUrlPad = 0) => {
  prettyPathLength = Math.max((url && url.length) || 0, prettyPathLength, defaultUrlPad);
  return rightPad(url, prettyPathLength);
};

export const getStatusLevel = (status: number): LoggerLevelType | null => {
  if (status >= 500) return 'error';
  if (status >= 400) return 'warn';
  if (status >= 300) return 'debug';
  return null;
};

export const prettyStatus = (status: number) => {
  let level = getStatusLevel(status);
  if (!level) level = status !== 200 ? 'log' : null;
  return themeizeLight(leftPad(String(status), 3), level);
};

export const prettyReqId = (reqId: number) => leftPad(`#${reqId}`, 3);

export const prettyMethod = (method: string) => {
  // eslint-disable-next-line no-nested-ternary
  const level: LoggerLevelType | null =
    method === 'REMOVE' ? 'error' : method === 'WS' ? 'debug' : null;
  return themeizeLight(leftPad(method, 4), level);
};

export const prettyTime = (ms: number, format = ''): string | null => {
  if (!Number.isFinite(ms)) return null;

  const level: LoggerLevelType | null = ms >= 10 * 1000 ? 'error' : ms >= 3 * 1000 ? 'warn' : null;
  const formats = ['m', 's', 'ms'];
  const f = formats.includes(format) ? format : '';

  const ns = Math.floor(Math.abs(ms) * 10 ** 6);
  const res = _prettyTime(ns, f);
  return themeizeLight(leftPad(res, 5), level);
};

export const prettySize = (bytes: number, seperator = ''): string | null => {
  if (!Number.isFinite(bytes)) return null;

  const raw = _prettyBytes(bytes, { maximumFractionDigits: 1 }).split(' ');
  const size = raw[1].toLowerCase();
  const value = +raw[0] >= 100 ? Math.round(+raw[0]) : +raw[0];

  const level = bytes > 1 * 1000 * 1000 ? 'error' : bytes > 5 * 1000 ? 'warn' : null;
  const size2 = level ? themeizeLight(size, level) : size;

  return `${value}${seperator}${size2}`;
};

export const prettyNs = (names: string[], mainName?: string | null): string => {
  // TODO: придумать когда name не очень нужен
  const finalNames: string[] = [...names, mainName].filter(Boolean).map(String);
  return finalNames.map((name: any) => themeizeRandom(name, name)).join(':');
};

export function prettyMarker(key: string | number): string {
  // https://www.alt-codes.net/
  const markers = ['○', '•', '♠', '♠', '♦', '♥', '☼', '♂', '♀', '♪', '§'];
  const marker = markers[hashCode(key) % markers.length];
  return themeizeRandom(marker, String(key));
}

export const prettyLevel = (level: LoggerLevelType, prefix = true): string => {
  let str: string;
  if (LOG_VIEW === 'emoji') {
    const icons: Record<string, string> = {
      fatal: lineCross,
      error: cross,
      warn: warning,
      // info: tick,
      info,
      debug: info,
      trace: info,
    };
    str = icons[level] || ' ';
    return (prefix ? ' ' : '') + themeizeLight(str, level);
  }

  if (LOG_VIEW === 'short') {
    str = (level[0] || '').toLowerCase();
    str = `[${str}]`;
  } else {
    str = leftPad(level, 5);
    str = `[${str}]`;
  }
  return themeize(str, level);
};

const highlightRegexp = /\[[^"\]]+]/gm;
export const prettyContent = (...args: any[]): any[] => {
  const colored: any[] = [];
  args.forEach((arg) => {
    if (typeof arg === 'string') {
      let i = 0;
      colored.push(
        arg.replace(highlightRegexp, (match) =>
          //eslint-disable-line
          colorize(match, contentColors[i++ % contentColors.length]),
        ),
      );
    } else {
      colored.push(arg);
    }
  });
  return colored;
};

export const prettyErr = (err: any): string | null => {
  if (!err) return null;
  const errCode = typeof err === 'string' ? err : Err.getCode(err);
  if (errCode === 'err_unknown') return null;
  return errCode.substr(0, 20);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUrlLevel = (req: any): LoggerLevelType => {
  const level = getStatusLevel(req.status);
  if (level) return level;
  return isLsklogWebFinal(req) ? 'debug' : 'trace';
};

export const prettyUrl = (req: any): string => {
  const isFinalUrl = isLsklogWebFinal(req);
  const level = getUrlLevel(req); // , { level }: { level?: string | null } = {}
  return [
    // [prettyMarker(req.reqId), prettyLevel(level, false)].join(''),
    prettyLevel(level),
    prettyMethod(req.method),
    prettyPath(req.url),
    prettyReqId(req.reqId),
    isFinalUrl && req.method !== 'WS' ? prettyStatus(req.status) : null,
    !isFinalUrl && '⧗⧖⧗',
    isFinalUrl && prettyTime(req.duration),
    isFinalUrl && req.method !== 'WS' ? prettySize(req.length) : null,
    isFinalUrl && req.err ? prettyErr(req.err) : null,
    // !isFinalUrl && '[...]',
    // !isFinalUrl && '⧖…⧗',
  ]
    .filter(Boolean)
    .join(' ');
};

// export default pretty;
