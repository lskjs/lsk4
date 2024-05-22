import { ObjectMapper } from './types.js';

export const groupBy = <T>(arr: Array<T>, filter: ObjectMapper<T>) =>
  arr.reduce(
    (acc, curr) => {
      const key = filter(curr);
      if (!acc[key]) acc[key] = [];
      acc[key].push(curr);
      return acc;
    },
    {} as Record<string, T[]>,
  );

export default groupBy;
