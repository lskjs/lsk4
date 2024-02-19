type BundleRequireOptions = {
  filepath: string;
};

export function bundleRequireSync<T>({ filepath }: BundleRequireOptions): { mod: T } {
  // eslint-disable-next-line import/no-dynamic-require
  const raw = require(filepath);
  return {
    mod: raw,
  };
}
