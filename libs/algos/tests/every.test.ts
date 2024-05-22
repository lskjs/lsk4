/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { every } from '../src';

const test = suite('every');

test('check values false', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = every(input, (a: any) => a > 3);
  assert.is(results, false);
});

test('check values true', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = every(input, (a: any) => a > 0);
  assert.is(results, true);
});

test('check keys false', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = every(input, (_, b: any) => b.length > 3);
  assert.is(results, false);
});

test('check keys true', () => {
  const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const results = every(input, (_, b: any) => b.length > 0);
  assert.is(results, true);
});

test.run();
