/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { set } from '../src';

const test = suite('set');

test('set flat', () => {
  const input = { one: 1, two: 2 };
  const results = set(input, 'three', 3);
  assert.equal(results, {
    one: 1,
    two: 2,
    three: 3,
  });
});

test('set deep values', () => {
  const input = { one: 1, two: 2 };
  const results = set(input, 'three.four', 4);
  assert.equal(results, {
    one: 1,
    two: 2,
    three: {
      four: 4,
    },
  });
});

test('set deep values with array', () => {
  const input = { one: 1, two: 2 };
  const results = set(input, ['three', 'four'], 4);
  assert.equal(results, {
    one: 1,
    two: 2,
    three: {
      four: 4,
    },
  });
});

test.run();
