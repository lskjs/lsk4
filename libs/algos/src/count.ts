export const count = <T extends Record<string, any>>(
  object: T,
  // eslint-disable-next-line no-shadow
  filter: (value: T[keyof T], key: keyof T, object: T) => boolean,
): number => {
  const keys = Object.keys(object);
  let counts = 0;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = object[key];
    if (filter(val, key, object)) counts += 1;
  }
  return counts;
};

export default count;
