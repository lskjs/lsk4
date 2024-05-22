/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { uniq } from '../src';

const test = suite('uniq');

test('empty', () => {
  const input: any[] = [];
  const results = uniq(input);
  assert.equal(results, []);
});

test('1,2,3', () => {
  const input = [1, 2, 3, 1, 2];
  const results = uniq(input);
  assert.equal(results, [1, 2, 3]);
});

test.run();
