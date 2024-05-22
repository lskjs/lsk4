/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { groupBy } from '../src';

const test = suite('groupBy');

test('default', () => {
  const input = [
    { id: 1, val: 1 },
    { id: 2, val: 2 },
    { id: 3, val: 2 },
  ];
  const results = groupBy(input, (a: any) => a.id);
  assert.equal(results, {
    1: [{ id: 1, val: 1 }],
    2: [{ id: 2, val: 2 }],
    3: [{ id: 3, val: 2 }],
  });
});

test('dublicates', () => {
  const input = [
    { id: 1, val: 1 },
    { id: 2, val: 2 },
    { id: 3, val: 2 },
  ];
  const results = groupBy(input, (a: any) => a.val);
  assert.equal(results, {
    1: [{ id: 1, val: 3 }],
    2: [
      { id: 1, val: 2 },
      { id: 3, val: 2 },
    ],
  });
});

test.run();
