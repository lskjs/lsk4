/* eslint-disable import/no-extraneous-dependencies */
import { Err } from '@lsk4/err';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { z, ZodError } from 'zod';

import { loadConfig } from '../src';

const test = suite('loadConfig()');
const cwd = 'tests/fixtures/zod';

test('env schema - valid', async () => {
  const schema = z.object({
    name: z.string(),
    count: z.number(),
  });
  const { config } = await loadConfig('valid', { cwd, schema });
  assert.is(config.name, 'The Name');
  assert.is(config.count, 123);
});

test('env schema - invalid', async () => {
  const schema = z.object({
    name: z.string(),
    count: z.number(),
  });

  try {
    await loadConfig('invalid', {
      cwd,
      silent: true,
      schema,
    });
    assert.unreachable('should have thrown');
  } catch (err: any) {
    assert.instance(err, Err);
    assert.match(err.code, 'invalidConfig');
    assert.match(err.message, 'invalidConfig');
    // assert.is(err.code, 'ERROR123');
  }

  const res = await loadConfig('invalid', {
    cwd,
    schema,
    silent: true,
    throwError: false,
  });
  const { config } = res;
  assert.is(config?.name, 'The Name');
  assert.is(config?.count, '123');
  assert.equal(
    JSON.stringify((res as any)?.error),
    JSON.stringify(
      new ZodError([
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'string',
          path: ['count'],
          message: 'Expected number, received string',
        },
      ]),
    ),
  );
});
test('env schema - misssing', async () => {
  const schema = z.object({
    name: z.string(),
    count: z.number(),
  });

  try {
    await loadConfig('missing', {
      cwd,
      silent: true,
      schema,
    });
    assert.unreachable('should have thrown');
  } catch (err: any) {
    assert.instance(err, Err);
    assert.match(err.code, 'invalidConfig');
    assert.match(err.message, 'invalidConfig');
    // assert.is(err.code, 'ERROR123');
  }

  const res = await loadConfig('missing', {
    cwd,
    schema,
    silent: true,
    throwError: false,
  });
  const { config } = res;
  assert.is(config?.name, 'The Name');
  assert.is(config?.count, undefined);
  assert.equal(
    JSON.stringify((res as any)?.error),
    JSON.stringify(
      new ZodError([
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path: ['count'],
          message: 'Required',
        },
      ]),
    ),
  );
});

test.run();
