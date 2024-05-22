/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { sortBy } from '../src';

const test = suite('sortBy');

test('empty', () => {
  const input: any[] = [];
  const results = sortBy(input, (a) => a.value);
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
  const results = sortBy(input, (a: any) => a.value);
  assert.equal(results, [
    { i: 1, value: 1 },
    { i: 4, value: 1 },
    { i: 2, value: 2 },
    { i: 5, value: 2 },
    { i: 3, value: 3 },
    { i: 6, value: 3 },
  ]);
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
  const results = sortBy(input, (a: any) => -a.i);
  assert.equal(results, [
    { i: 6, value: 3 },
    { i: 5, value: 2 },
    { i: 4, value: 1 },
    { i: 3, value: 3 },
    { i: 2, value: 2 },
    { i: 1, value: 1 },
  ]);
});

test.run();
