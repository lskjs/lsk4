/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { setProps } from '../src';

const test = suite('setProps');

test('setProps', () => {
  const input = { one: 1, two: 2 };
  const input2 = { two: 4, three: 6 };
  const input3 = { three: 9, four: 12 };
  const results = setProps({}, input, input2, input3);
  assert.equal(results, {
    one: 1,
    two: 4,
    three: 9,
    four: 12,
  });
});

test.run();
