import { omitNull } from '@lsk4/algos';
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
    const level = options.level || 'info';
    const body = omitNull({
      ns,
      type: type === 'text' ? null : 'md',
      msg,
      level: level === 'info' ? null : level,
    });
    const path = ns || '/';
    const { data } = await this.client.post(path, body).catch((err) => {
      this.log.error('[send]', Err.getCode(err));
      return { data: null };
    });
    return data;
  }
  trace(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { ...options, level: 'trace' });
  }
  debug(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { ...options, level: 'debug' });
  }
  info(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { ...options, level: 'info' });
  }
  warn(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { ...options, level: 'warn' });
  }
  error(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { ...options, level: 'error' });
  }
  fatal(data: RlogSendData, options: RlogSendOptions = {}) {
    return this.send(data, { ...options, level: 'error' });
  }
}

export default Rlog;
