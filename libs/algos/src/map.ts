import mapValues from './mapValues.js';
import { ObjectLike, ObjectMapper } from './types.js';

export const map = <T>(object: ObjectLike<T>, mapper: ObjectMapper<T> = (a) => a): Array<T> =>
  Object.values(mapValues(object, mapper));

export default map;
