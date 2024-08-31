export const pickBy = <T extends Record<string, any>>(
  obj: T,
  filter: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> => {
  const result = {} as Partial<T>;
  (Object.keys(obj) as Array<keyof T>).forEach((key) => {
    if (filter(obj[key], key)) result[key] = obj[key];
  });
  return result;
};

export default pickBy;
