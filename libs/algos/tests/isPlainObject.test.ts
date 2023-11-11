/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { isPlainObject } from '../src';

const test = suite('isPlainObject');

test('should return `true` if the object is created by the `Object` constructor.', () => {
  assert.ok(isPlainObject(Object.create({})));
  assert.ok(isPlainObject(Object.create(Object.prototype)));
  assert.ok(isPlainObject({ foo: 'bar' }));
  assert.ok(isPlainObject({}));
  assert.ok(isPlainObject(Object.create(null)));
});

test('should return `false` if the object is not created by the `Object` constructor.', () => {
  function Foo() {
    // @ts-ignore
    this.abc = {};
  }
  assert.not.ok(isPlainObject(/foo/));
  assert.not.ok(isPlainObject(() => {}));
  // eslint-disable-next-line prefer-arrow-callback
  assert.not.ok(isPlainObject(function () {}));
  assert.not.ok(isPlainObject(1));
  assert.not.ok(isPlainObject(['foo', 'bar']));
  assert.not.ok(isPlainObject([]));
  // @ts-ignore
  assert.not.ok(isPlainObject(new Foo()));
  assert.not.ok(isPlainObject(null));
});

test.run();
