import { ObjectMapper } from './types.js';

export const sortBy = <T>(arr: Array<T>, filter: ObjectMapper<T>) =>
  arr.sort((a, b) => filter(a) - filter(b));

export default sortBy;
