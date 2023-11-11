/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { pickBy } from '../src';

const test = suite('pickBy');

test('should work with a predicate argument', () => {
  const input = { one: 1, two: 2, three: 3, four: 4 };
  const results = pickBy(input, (n) => n === 2 || n === 4);
  assert.equal(results, { two: 2, four: 4 });
});

test.run();
