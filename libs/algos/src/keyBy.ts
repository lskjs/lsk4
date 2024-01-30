// Source: https://github.com/cloudacy/keyby

export function keyBy<
  A extends Record<string, unknown>,
  K extends keyof {
    [P in keyof A as A[P] extends PropertyKey ? P : never]: unknown;
  },
>(array: A[], key: K) {
  return array.reduce(
    (r, x) => ({ ...r, [x[key] as unknown as PropertyKey]: x }),
    {} as { [P in A[K] as A[K] extends PropertyKey ? A[K] : never]: A },
  );
}

export function keyByFn<A extends Record<string, unknown>, K extends PropertyKey>(
  array: A[],
  keyFn: (x: A) => K,
) {
  return array.reduce((r, x) => ({ ...r, [keyFn(x)]: x }), {} as { [P in K]: A });
}

// TODO: combine keyBy and keyByFn

export default keyBy;
