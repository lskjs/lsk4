/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { loadConfigSync } from '../src';

const test = suite('loadConfigSync()');
const cwd = 'tests/fixtures/any';

test('find some env', () => {
  const { config = {} as any } = loadConfigSync('env', {
    cwd,
  });
  assert.match(config['this is'], 'file');
});

test('find typescript env with multiple exts', () => {
  const { config = {} as any } = loadConfigSync('env', {
    cwd,
    exts: ['.ts', '.json', '.mjs', '.cjs'],
  });
  assert.is(config['this is'], 'typescript file');
});

test('find commonjs env', () => {
  const { config = {} as any } = loadConfigSync('env', {
    cwd,
    exts: ['.cjs'],
  });
  assert.is(config['this is'], 'common js file');
});

test('find js env', () => {
  const { config = {} as any } = loadConfigSync('env', {
    cwd,
    exts: ['.js'],
  });
  assert.is(config['this is'], 'js file');
});

test('find ecmamodules env', () => {
  const { config = {} as any } = loadConfigSync('env', {
    cwd,
    exts: ['.mjs'],
  });
  assert.is(config['this is'], 'ecmamodules file');
});

test('find json env', () => {
  const { config = {} as any } = loadConfigSync('env', {
    cwd,
    exts: ['.json'],
  });
  assert.is(config['this is'], 'json(c) file');
});

test('find env from package.json', () => {
  const { config = {} as any } = loadConfigSync('env', {
    packageKey: 'publishConfig',
  });
  assert.is(config.access, 'public');
});

if (typeof process.env.TEST_JSON_ENV === 'string') {
  test('find json even if process.env.TEST_JSON_ENV is defined', () => {
    const { config = {} as any } = loadConfigSync('env', {
      cwd,
      exts: ['.json'],
      processEnvKey: 'TEST_JSON_ENV',
    });
    assert.is(config['this is'], 'json(c) file');
  });

  test('find env from process.env.TEST_JSON_ENV', () => {
    const { config = {} as any } = loadConfigSync('env_not_found', {
      cwd,
      processEnvKey: 'TEST_JSON_ENV',
    });
    assert.is(config['this is'], 'process.env.TEST_JSON_ENV');
  });
}

test.run();
