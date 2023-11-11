/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { maxBy } from '../src';

const maxByTest = suite('maxBy');

maxByTest('empty', () => {
  const input = [];
  const results = maxBy(input, (a) => a.value);
  assert.is(results, undefined);
});

maxByTest('1,2,3', () => {
  const input = [
    { i: 1, value: 1 },
    { i: 2, value: 2 },
    { i: 3, value: 3 },
    { i: 4, value: 1 },
    { i: 5, value: 2 },
    { i: 6, value: 3 },
  ];
  const results = maxBy(input, (a) => a.value);
  assert.equal(results, { i: 3, value: 3 });
});

maxByTest.run();
