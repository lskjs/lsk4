/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { map } from '../src';

const mapTest = suite('map');

mapTest('without mapper', () => {
  const input = { one: 1, two: 2, three: 3 };
  const results = map(input);
  assert.equal(results, [1, 2, 3]);
});

mapTest('simple mapper', () => {
  const input = { one: 1, two: 2, three: 3 };
  const mapper = (a) => a * 2;
  const results = map(input, mapper);
  assert.equal(results, [2, 4, 6]);
});

mapTest.run();
