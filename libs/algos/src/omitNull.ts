import { pickBy } from './pickBy.js';
// import { NonNullable } from './types.js';

export const omitNull = <T extends Record<string, any>>(
  obj: T,
  filter: (value: T[keyof T]) => boolean = (a) => a != null,
) => pickBy(obj, filter) as Partial<NonNullable<T>>;

// type OmitNullAndUndefined<T> = {
//   [K in keyof T]: Exclude<T[K], null | undefined>;
// };

// type NonNullableKeys<T> = {
//   [K in keyof T as T[K] extends null | undefined ? never : K]: K;
// }[keyof T];

// type FilteredResult<T> = Pick<OmitNullAndUndefined<T>, NonNullableKeys<T>>;

// export const omitNull = <T extends Record<string, any>>(
//   obj: T,
//   filter: (value: T[keyof T]) => boolean = (a) => a != null,
// ): FilteredResult<T> => pickBy(obj, filter) as FilteredResult<T>;

// type OmitNullAndUndefined<T> = {
//   [K in keyof T as T[K] extends null | undefined ? never : K]: Exclude<T[K], null | undefined>;
// };
// const b = omitNull(a, (a) => a != null) as OmitNullAndUndefined<typeof a>;
// const c =  omitNull(a);
// const g = {
//   q: c.a
// }

// const a = { a: 1, b: null, c: 3 };

// // const z = a as NonNullable<typeof a>;
// const z = a as Omit<typeof a, 'b'> ;

// const za = z.a
// const zb = z.b
// const zc = z.c

// type NonNullable2<T> = Exclude<T, null | undefined>;
// const z2 = a as NonNullable2<typeof a>;
// const z2a = z2.a
// const z2b = z2.b
// const z2c = z2.c

// type NonNullable1<T> = {
//   [P in keyof T]-?: Exclude<T[P], null | undefined>;
// };
// const z1 = a as NonNullable1<typeof a>;
// const z1a = z1.a
// const z1b = z1.b
// const z1c = z1.c

// export default omitNull;
