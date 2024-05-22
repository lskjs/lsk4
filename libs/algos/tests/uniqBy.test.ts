/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { uniqBy } from '../src';

const test = suite('uniqBy');

test('empty', () => {
  const input: any[] = [];
  const results = uniqBy(input, (a) => a.value);
  assert.equal(results, []);
});

test('1,2,3', () => {
  const input = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }, { value: 2 }];
  const results = uniqBy(input, (a: any) => a.value);
  assert.equal(results, [{ value: 1 }, { value: 2 }, { value: 3 }]);
});

test.run();
