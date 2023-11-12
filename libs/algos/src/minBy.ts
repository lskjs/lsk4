import { ObjectMapper } from './types.js';

export const minBy = <T>(arr: Array<T>, filter: ObjectMapper<T>) =>
  arr.reduce((min, curr) => (filter(curr) < filter(min) ? curr : min), arr[0]);

export default minBy;
