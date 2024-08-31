import pickBy from './pickBy';

export const omitBy = <T extends Record<string, any>>(
  obj: T,
  filter: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> => pickBy(obj, (value, key) => !filter(value, key));

export default omitBy;
