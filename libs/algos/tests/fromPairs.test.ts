/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { fromPairs } from '../src';

const test = suite('fromPairs');

test('check values', () => {
  const input: Array<[string, number]> = [
    ['one', 1],
    ['two', 2],
    ['three', 3],
  ];
  const results = fromPairs(input);
  assert.equal(results, { one: 1, two: 2, three: 3 });
});

test.run();
