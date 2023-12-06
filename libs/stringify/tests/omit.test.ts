/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { omit } from '../src';

const test = suite('omit');

test('should work with a predicate argument', () => {
  const input = { one: 1, two: 2, three: 3, four: 4 };
  const results = omit(input, ['two', 'four']);
  assert.equal(results, { one: 1, three: 3 });
});

test.run();
