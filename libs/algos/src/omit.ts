import pick from './pick.js';

export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => pick(obj, Object.keys(obj).filter((k: any) => !keys.includes(k)) as any);

export default omit;
