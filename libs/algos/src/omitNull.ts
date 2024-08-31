import { pickBy } from './pickBy.js';

export const omitNull = <T extends Record<string, any>>(
  obj: T,
  filter: (value: T[keyof T]) => boolean = (a) => a != null,
): Partial<T> => pickBy(obj, filter);

export default omitNull;
