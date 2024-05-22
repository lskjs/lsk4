/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { countBy } from '../src';

const test = suite('countBy');

test('empty mapper', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = countBy(input);
  assert.equal(results, { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
});

test('check values', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = countBy(input, (a: any) => a % 2);
  assert.equal(results, { 1: 3, 0: 2 });
});

test('check keys', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = countBy(input, (_, b: any) => b.length);
  assert.equal(results, { 3: 2, 4: 2, 5: 1 });
});

test.run();
