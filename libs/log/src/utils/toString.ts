import { stringify } from './stringify.js';
// import stringify from 'fast-safe-stringify';

export const toString = (props: any, arg1: any = null, arg2 = 0) =>
  typeof props === 'object' ? stringify(props, arg1, arg2) : String(props);

export default toString;
