/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { omitNull } from '../src';

const test = suite('omitNull');

test('should work with a predicate argument', () => {
  const input = { one: 1, two: null, three: 3, four: undefined };
  const results = omitNull(input);
  assert.equal(results, { one: 1, three: 3 });
});

test.run();
