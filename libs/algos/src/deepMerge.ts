/* eslint-disable no-param-reassign */
import { isPlainObject } from './isPlainObject.js';
import { mapValues } from './mapValues.js';

const isBoth = (a: any, b: any, fn: (c: any) => boolean): boolean => fn(a) && fn(b);

const deepMergeInto = (target: any, source: any): any => {
  if (!isBoth(target, source, isPlainObject)) {
    return source;
  }
  return {
    ...target,
    ...mapValues(source, (value, key: any) => {
      const targetValue = target[key];
      if (isBoth(targetValue, value, Array.isArray)) return targetValue.concat(value);
      if (isBoth(targetValue, value, isPlainObject)) {
        return deepMergeInto({ ...targetValue }, value);
      }
      return value;
    }),
  };
};

export const deepMerge = <T = Record<string, never>>(...objects: Record<string, any>[]): T => {
  let target = {};
  objects.forEach((object) => {
    target = deepMergeInto(target, object);
  });
  return target as T;
};

export default deepMerge;
