/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { deepMerge } from '../src';

const test = suite('deepMerge');

test('without mapper', () => {
  const input1 = {
    foo: { bar: 3 },
    array: [
      {
        does: 'work',
        too: [1, 2, 3],
      },
    ],
  };
  const input2 = {
    foo: { baz: 4 },
    quux: 5,
    array: [
      {
        does: 'work',
        too: [4, 5, 6],
      },
      {
        really: 'yes',
      },
    ],
  };
  const output = {
    foo: {
      bar: 3,
      baz: 4,
    },
    array: [
      {
        does: 'work',
        too: [1, 2, 3],
      },
      {
        does: 'work',
        too: [4, 5, 6],
      },
      {
        really: 'yes',
      },
    ],
    quux: 5,
  };

  const results = deepMerge(input1, input2);
  assert.equal(results, output);
});

test.run();
