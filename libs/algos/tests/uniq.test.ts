/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { uniq } from '../src';

const uniqTest = suite('uniq');

uniqTest('empty', () => {
  const input = [];
  const results = uniq(input);
  assert.equal(results, []);
});

uniqTest('1,2,3', () => {
  const input = [1, 2, 3, 1, 2];
  const results = uniq(input);
  assert.equal(results, [1, 2, 3]);
});

uniqTest.run();
