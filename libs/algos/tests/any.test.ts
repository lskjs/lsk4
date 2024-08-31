/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { any } from '../src';

const test = suite('any');

test('check value', () => {
  const input = { one: 1, two: 2, three: 3 };
  const results = any(input, (a) => a === 3);
  assert.equal(results, true);
}); 
test('check false value', () => {
  const input = { one: 1, two: 2, three: 3 };
  const results = any(input, (a) => a === 44);
  assert.equal(results, false);
});

test.run();
