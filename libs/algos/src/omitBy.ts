import { pickBy } from './pickBy.js';
import { ObjectFilter, ObjectLike } from './types.js';

export const omitBy = <T>(object: ObjectLike<T>, filter: ObjectFilter<T>) =>
  pickBy(object, (...args) => !filter(...args));

export default omitBy;
