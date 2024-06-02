import { omit, omitNull } from '@lsk4/algos';
import { Err } from '@lsk4/err';
import type { ILogger } from '@lsk4/log';
import { createLogger } from '@lsk4/log';
import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { RlogOptions, RlogSendData, RlogSendOptions } from './types.js';

const safeStringify = (data: any, { maxLen = 1000 }: { maxLen?: number } = {}) => {
  try {
    return JSON.stringify(data, null, 2).slice(0, maxLen);
  } catch (err) {
    return null;
  }
};

export class Rlog {
  log: ILogger;
  client: AxiosInstance;
  options: RlogOptions;
  constructor(options: RlogOptions = {}) {
    const logLevel = options.logLevel || 'error';
    this.log = createLogger('rlog', { level: logLevel });
    const { url, token } = options;
    this.options = options;
    this.client = axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async send(raw: RlogSendData, options: RlogSendOptions = {}) {
    const msg =
      // eslint-disable-next-line no-nested-ternary
      typeof raw === 'string'
        ? raw
        : Err.isError(raw)
          ? Err.getJSON(raw, true)
          : safeStringify(raw);
    const ns = options.ns || this.options.ns || null;
    const type = options.type || 'text';
    const { level } = options;
    const { throw: throwError = false } = options;
    const body = omitNull({
      ns,
      type: type === 'text' ? null : 'md',
      msg,
      level,
      ...omit(options, ['ns', 'type', 'level', 'msg', 'throw'] as any),
    });
    const path = ns || '/';
    try {
      const { data } = await this.client.post(path, body);
      return data;
    } catch (err) {
      if (throwError) throw err;
      this.log.error('[send]', Err.getCode(err));
      return { data: null };
    }
  }
  trace(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { level: 'trace', ...options });
  }
  debug(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { level: 'debug', ...options });
  }
  info(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { level: 'info', ...options });
  }
  warn(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { level: 'warn', ...options });
  }
  error(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { level: 'error', ...options });
  }
  fatal(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { level: 'error', ...options });
  }
}

export default Rlog;
