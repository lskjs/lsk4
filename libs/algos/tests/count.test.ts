/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { count } from '../src';

const test = suite('count');

test('check values', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = count(input, (a) => a > 3);
  assert.equal(results, 2);
});

test('check keys', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = count(input, (_, b) => b?.length === 3);
  assert.equal(results, 2);
});

test.run();
