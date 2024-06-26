/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { mapValues } from '../src';

const test = suite('mapValues');

test('without mapper', () => {
  const input = { one: 1, two: 2, three: 3 };
  const results = mapValues(input);
  assert.equal(results, { one: 1, two: 2, three: 3 });
});

test('simple mapper', () => {
  const input = { one: 1, two: 2, three: 3 };
  const mapper = (a: any) => a * 2;
  const results = mapValues(input, mapper);
  assert.equal(results, { one: 2, two: 4, three: 6 });
});

test.run();
