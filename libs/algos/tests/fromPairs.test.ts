/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { fromPairs } from '../src';

const fromPairsTest = suite('fromPairs');

fromPairsTest('check values', () => {
  const input = [
    ['one', 1],
    ['two', 2],
    ['three', 3],
  ];
  const results = fromPairs(input);
  assert.equal(results, { one: 1, two: 2, three: 3 });
});

fromPairsTest.run();
