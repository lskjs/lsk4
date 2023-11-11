/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { toPairs } from '../src';

const toPairsTest = suite('toPairs');

toPairsTest('check values', () => {
  const input = { one: 1, two: 2, three: 3 };
  const results = toPairs(input);
  assert.equal(results, [
    ['one', 1],
    ['two', 2],
    ['three', 3],
  ]);
});

toPairsTest.run();
