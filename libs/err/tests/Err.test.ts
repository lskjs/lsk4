/* eslint-disable import/no-extraneous-dependencies */
import { pick } from '@macrobe/algos';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { Err } from '../src';

const partialEqual = (a: any, b: any) => assert.equal(pick(a, Object.keys(b)), b);

const test = suite('Err');

test('Err()', () => {
  const input: any[] = [];
  const res = {
    name: 'Err',
    code: 'err_unknown',
    message: 'err_unknown',
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: err_unknown');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err("some_code")', () => {
  const input: any[] = ['some_code'];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'some_code',
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: some_code');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err("some_code", "Some error message")', () => {
  const input: any[] = ['some_code', 'Some error message'];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'Some error message',
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: Some error message');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err("some_code", "Some error message", { options: 123 })', () => {
  const input: any[] = ['some_code', 'Some error message', { options: 123 }];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'Some error message',
    options: 123,
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: Some error message');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err("some_code", "Some error message", { options: 123 }, { otherOptions: 321 })', () => {
  const input: any[] = ['some_code', 'Some error message', { options: 123 }, { otherOptions: 321 }];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'Some error message',
    options: 123,
    otherOptions: 321,
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: Some error message');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err("some_code", { options: 123 })', () => {
  const input: any[] = ['some_code', { options: 123 }];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'some_code',
    options: 123,
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: some_code');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err("some_code", { options: 123, code: "new_code" })', () => {
  const input: any[] = ['some_code', { options: 123, code: 'new_code' }];
  const res = {
    name: 'Err',
    code: 'new_code',
    message: 'new_code',
    options: 123,
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: new_code');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err({ options: 123 })', () => {
  const input: any[] = [{ options: 123 }];
  const res = {
    name: 'Err',
    code: 'err_unknown',
    message: 'err_unknown',
    options: 123,
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: err_unknown');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err({ options: 123 }, "Some broken message")', () => {
  const input: any[] = [{ options: 123 }];
  const res = {
    name: 'Err',
    code: 'err_unknown',
    message: 'err_unknown',
    options: 123,
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: err_unknown');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test('Err("login_error", { realPassword: "password", data: { password: "incorrect" } })', () => {
  const input: any[] = [
    'login_error',
    'Password didnt match',
    { realPassword: 'password', data: { password: 'incorrect' } },
  ];
  const res = {
    name: 'Err',
    code: 'login_error',
    message: 'Password didnt match',
    realPassword: 'password',
    data: {
      password: 'incorrect',
    },
  };
  const err = new Err(...input);

  assert.instance(err, Error);
  assert.instance(err, Err);
  assert.is(err.__err, true);
  assert.match(err.stack!, 'Err: Password didnt match');
  partialEqual(err, res);
  partialEqual(err.getJSON(), res);
});

test.run();
