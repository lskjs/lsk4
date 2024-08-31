export const countBy = <T extends Record<string, any>>(
  object: T,
  // eslint-disable-next-line no-shadow
  mapper: (value: T[keyof T], key: keyof T, object: T) => string = (value) => String(value),
): Record<string, number> => {
  const keys = Object.keys(object);
  const counts = {} as Record<string, number>;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = object[key];
    const mapValue = mapper(val, key, object);
    counts[String(mapValue)] = (counts[String(mapValue)] || 0) + 1;
  }
  return counts;
};

export default countBy;
