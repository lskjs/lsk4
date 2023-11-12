import { pickBy } from './pickBy.js';
import { ObjectFilter, ObjectLike } from './types.js';

const defaultFilter: ObjectFilter<any> = (a) => a != null;

export const omitNull = <T>(object: ObjectLike<T>, filter: ObjectFilter<T> = defaultFilter) =>
  pickBy(object, filter);

export default omitNull;
