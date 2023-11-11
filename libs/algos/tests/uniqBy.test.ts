/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { uniqBy } from '../src';

const uniqByTest = suite('uniqBy');

uniqByTest('empty', () => {
  const input = [];
  const results = uniqBy(input, (a) => a.value);
  assert.equal(results, []);
});

uniqByTest('1,2,3', () => {
  const input = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }, { value: 2 }];
  const results = uniqBy(input, (a) => a.value);
  assert.equal(results, [{ value: 1 }, { value: 2 }, { value: 3 }]);
});

uniqByTest.run();
