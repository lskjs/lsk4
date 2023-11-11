/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { omitBy } from '../src';

const test = suite('omitBy');

test('should work with a predicate argument', () => {
  const input = { one: 1, two: 2, three: 3, four: 4 };
  const results = omitBy(input, (n) => n === 2 || n === 4);
  assert.equal(results, { one: 1, three: 3 });
});

test.run();
