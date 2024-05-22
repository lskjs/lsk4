/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { minBy } from '../src';

const test = suite('minBy');

test('empty', () => {
  const input: any[] = [];
  const results = minBy(input, (a) => a.value);
  assert.is(results, undefined);
});

test('1,2,3', () => {
  const input = [
    { i: 1, value: 1 },
    { i: 2, value: 2 },
    { i: 3, value: 3 },
    { i: 4, value: 1 },
    { i: 5, value: 2 },
    { i: 6, value: 3 },
  ];
  const results = minBy(input, (a: any) => a.value);
  assert.equal(results, { i: 1, value: 1 });
});

test('3,2,1', () => {
  const input = [
    { i: 6, value: 3 },
    { i: 5, value: 2 },
    { i: 4, value: 1 },
    { i: 3, value: 3 },
    { i: 2, value: 2 },
    { i: 1, value: 1 },
  ];
  const results = minBy(input, (a: any) => a.value);
  assert.equal(results, { i: 4, value: 1 });
});

test.run();
