/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { pick } from '../src';

const pickTest = suite('pick');

pickTest('should work with a predicate argument', () => {
  const input = { one: 1, two: 2, three: 3, four: 4 };
  const results = pick(input, ['two', 'four']);
  assert.equal(results, { two: 2, four: 4 });
});

pickTest.run();
