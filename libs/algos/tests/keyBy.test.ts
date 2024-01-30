/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { keyBy } from '../src';
import { keyByFn } from '../src/keyBy';

const test = suite('map');

test('default', () => {
  const input = [
    { id: 1, val: 1 },
    { id: 2, val: 2 },
    { id: 3, val: 3 },
  ];
  const results = keyBy(input, 'id');
  assert.equal(results, {
    1: { id: 1, val: 1 },
    2: { id: 2, val: 2 },
    3: { id: 3, val: 3 },
  });
});

test('overrides', () => {
  const input = [
    { id: 1, val: 1 },
    { id: 1, val: 2 },
    { id: 1, val: 3 },
  ];
  const results = keyBy(input, 'id');
  assert.equal(results, {
    1: { id: 1, val: 3 },
  });
});

test('default fn', () => {
  const input = [
    { id: 1, val: 1 },
    { id: 2, val: 2 },
    { id: 3, val: 3 },
  ];
  const results = keyByFn(input, (a) => a.id);
  assert.equal(results, {
    1: { id: 1, val: 1 },
    2: { id: 2, val: 2 },
    3: { id: 3, val: 3 },
  });
});

test('overrides fn', () => {
  const input = [
    { id: 1, val: 1 },
    { id: 1, val: 2 },
    { id: 1, val: 3 },
  ];
  const results = keyByFn(input, (a) => a.id);
  assert.equal(results, {
    1: { id: 1, val: 3 },
  });
});

test.run();
