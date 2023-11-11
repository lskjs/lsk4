/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { pad } from '../src';

const padTest = suite('pad');

padTest('empty width', () => {
  const input = 'Hello';
  const results = pad(input);
  assert.is(results, 'Hello');
});

padTest('width=1', () => {
  const input = 'Hello';
  const results = pad(input, 1);
  assert.is(results, 'Hello');
});

padTest('width=5', () => {
  const input = 'Hello';
  const results = pad(input, 5);
  assert.is(results, 'Hello');
});

padTest('width=6', () => {
  const input = 'Hello';
  const results = pad(input, 6);
  assert.is(results, 'Hello ');
});

padTest('width=7', () => {
  const input = 'Hello';
  const results = pad(input, 7);
  assert.is(results, ' Hello ');
});

padTest('width=7 fillString=#', () => {
  const input = 'Hello';
  const results = pad(input, 7, '#');
  assert.is(results, '#Hello#');
});

padTest.run();
