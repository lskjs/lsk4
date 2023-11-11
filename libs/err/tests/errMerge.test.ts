/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { errMerge } from '../src';

const test = suite('errMerge');

test('errMerge("some_code")', () => {
  const input = ['some_code'];
  const res = {
    code: 'some_code',
  };
  assert.equal(errMerge(...input), res);
});

test('errMerge("some_code", "Some error message")', () => {
  const input = ['some_code', 'Some error message'];
  const res = {
    code: 'some_code',
    message: 'Some error message',
  };
  assert.equal(errMerge(...input), res);
});

test('errMerge("some_code", "Some error message", { options: 123 })', () => {
  const input = ['some_code', 'Some error message', { options: 123 }];
  const res = {
    code: 'some_code',
    message: 'Some error message',
    options: 123,
  };
  assert.equal(errMerge(...input), res);
});

test('errMerge("some_code", "Some error message", { options: 123 }, { otherOptions: 321 })', () => {
  const input = ['some_code', 'Some error message', { options: 123 }, { otherOptions: 321 }];
  const res = {
    code: 'some_code',
    message: 'Some error message',
    options: 123,
    otherOptions: 321,
  };
  assert.equal(errMerge(...input), res);
});

test('errMerge("some_code", { options: 123 })', () => {
  const input = ['some_code', { options: 123 }];
  const res = {
    code: 'some_code',
    options: 123,
  };
  assert.equal(errMerge(...input), res);
});

test('errMerge("some_code", { options: 123, code: "new_code" })', () => {
  const input = ['some_code', { options: 123, code: 'new_code' }];
  const res = {
    code: 'new_code',
    options: 123,
  };
  assert.equal(errMerge(...input), res);
});

test('errMerge({ options: 123 })', () => {
  const input = [{ options: 123 }];
  const res = {
    options: 123,
  };
  assert.equal(errMerge(...input), res);
});

test('errMerge({ options: 123 }, "Some broken message")', () => {
  const input = [{ options: 123 }];
  const res = {
    options: 123,
  };
  assert.equal(errMerge(...input), res);
});

test.run();
