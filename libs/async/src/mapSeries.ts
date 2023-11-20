/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { map } from './map.js';
import type { IterateFunction } from './types.js';

export function mapSeries<IN, OUT>(
  arr: (IN | Promise<IN>)[],
  fn: IterateFunction<IN | Promise<IN>, OUT>,
): Promise<OUT[]> {
  return map<IN, OUT>(arr, fn, { concurrency: 1 });
}

export default mapSeries;
