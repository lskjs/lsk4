import { omit, pick } from '@lsk4/algos';

const uniq = (arr: any[]) => Array.from(new Set(arr));

export const errUnknown = 'errUnknown';

export const getMessage = (err: any, def = errUnknown): string => {
  if (typeof err === 'string') return err;
  const errName = err && err.name !== 'Error' ? err.name : null;
  const str = (err && (err.message || err.text || err.code || errName)) || def;
  return String(str).substring(0, 1000);
};

export const getText = (err: any, def = errUnknown): string => {
  const array = [err.code, getMessage(err), err.text, err.stack];
  return (err && uniq(array.filter(Boolean)).join('\n')) || def || errUnknown;
};

export const getCode = (err: any, def = errUnknown): string =>
  (err && (err.code || err.name || err.text || err.message)) || def;

export const getCodeMessage = (err: any, def = errUnknown): [string, string?] => {
  const code = getCode(err);
  const message = getMessage(err);
  if (code === message) return [code ?? def];
  return [code ?? def, message].filter(Boolean) as [string, string?];
};

export const getJSON = (err: any, onlySafeField = false): Record<string, unknown> => {
  if (typeof err === 'string') return { code: err, message: err };

  let data = {
    ...((err && err.__raw) || {}),
  };
  if (onlySafeField) {
    data = {
      ...data,
      ...pick(err, ['name', 'code', 'message', 'text', 'data']),
    };
  } else {
    data = {
      ...data,
      // @ts-ignore
      ...omit(pick(err, Object.getOwnPropertyNames(err)), ['__err']),
    };
  }
  return data;
};

export const isError = (err: any): boolean => err instanceof Error;
