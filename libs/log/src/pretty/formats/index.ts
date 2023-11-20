import { ILoggerInternalMessage, ILoggerInternalMessageFormat } from '../../types.js';
import { createMsg, getErrCode } from '../../utils/createMsg.js';
import { isBunyan, parseBunyan, stringifyBunyan } from './bunyan.js';
import { isLogrus, parseLogrus, stringifyLogrus } from './logrus.js';
import { isLskLikelog, isLsklog, isLsklogWeb, parseLsklog, stringifyLsklog } from './lsklog.js';

export function detectFormat(json: any): ILoggerInternalMessageFormat | null {
  if (isBunyan(json)) return ILoggerInternalMessageFormat.bunyan;
  if (isLsklog(json)) return ILoggerInternalMessageFormat.lsklog;
  if (isLsklogWeb(json)) return ILoggerInternalMessageFormat.lsklogweb;
  if (isLogrus(json) && isLskLikelog(json) && json?.name) {
    return ILoggerInternalMessageFormat.lsklog;
  }
  if (isLogrus(json)) return ILoggerInternalMessageFormat.logrus;
  if (isLskLikelog(json)) return ILoggerInternalMessageFormat.lsklog;
  return null;
}

export function stringify(format: string, meta: Record<string, unknown>, ...args: any[]): any {
  const code = getErrCode(args);
  const msg = createMsg(args);
  const data = {
    code,
    ...meta,
    msg,
  };
  if (format === 'bunyan') return stringifyBunyan(data);
  if (format === 'logrus') return stringifyLogrus(data);
  return stringifyLsklog(data);
}

export function parse(json: any): ILoggerInternalMessage {
  const format = detectFormat(json);
  if (format === 'bunyan') return parseBunyan(json);
  if (format === 'lsklogweb') return parseLsklog(json);
  if (format === 'lsklog') return parseLsklog(json);
  if (format === 'logrus') return parseLogrus(json);
  return { format, meta: {}, args: [json] };
}
