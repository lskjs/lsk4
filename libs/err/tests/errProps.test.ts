/* eslint-disable import/no-extraneous-dependencies */
import { pick } from '@lsk4/algos';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { Err, errProps } from '../src';

const partialEqual = (a: any, b: any) => assert.equal(pick(a, Object.keys(b)), b);

const test = suite('errProps');

test('errProps({ a: 123 })', () => {
  const input = { a: 123 };
  const res = { a: 123 };
  const err = errProps(input);

  assert.equal(err, res);
});

test('errProps(new Error)', () => {
  const error = new Error('Test');
  const res = {
    message: 'Test',
    name: 'Error',
  };
  const err = errProps(error);

  partialEqual(err, res);
  assert.ok(err.stack);
});

test('errProps(new Error2)', () => {
  const error = new Error('Test');
  error.text = 'test_text';
  const res = {
    message: 'Test',
    name: 'Error',
    text: 'test_text',
  };
  const err = errProps(error);

  partialEqual(err, res);
  assert.ok(err.stack);
});

test('errProps(new Err)', () => {
  const error = new Err('test_code', { field: 123 });
  const res = {
    code: 'test_code',
    message: 'test_code',
    name: 'Err',
    field: 123,
  };
  const err = errProps(error);

  partialEqual(err, res);
  assert.ok(err.stack);
});

test('errProps()', () => {
  const input = undefined;
  const res = {};
  const err = errProps(input);

  assert.equal(err, res);
});

test('errProps(123)', () => {
  const input = 123;
  const res = {};
  const err = errProps(input);

  assert.equal(err, res);
});

test.run();
