import { Err } from '@lsk4/err';

// NOTE: ESM Import or CJS require
export async function importRequire(path: string, { removeCache }: { removeCache?: boolean } = {}) {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const res = require(path);
    if (removeCache) delete require.cache[require.resolve(path)];
    return res;
  } catch (requireErr) {
    if (Err.getCode(requireErr) === 'MODULE_NOT_FOUND') {
      throw new Err(`${path} not found`, requireErr);
    }
    const isTryImport =
      Err.getCode(requireErr).startsWith('Dynamic require of') ||
      Err.getCode(requireErr).startsWith(
        'ReferenceError: module is not defined in ES module scope',
      );
    // console.log({ isTryImport });
    if (isTryImport) {
      try {
        const rand = Date.now() + Math.random();
        const fullpath = removeCache ? `${path}?update=${rand}` : path;
        const res = await import(fullpath);
        return res;
      } catch (importErr) {
        if (Err.getCode(importErr) === 'ERR_MODULE_NOT_FOUND') {
          throw new Err(`${path} not found`, importErr);
        }
        throw new Err('importErr', importErr);
      }
    }
    throw new Err('requireErr', requireErr);
  }
}
