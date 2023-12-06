/* eslint-disable import/no-extraneous-dependencies */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { loadConfig } from '../src';

const test = suite('loadConfig()');

test('find some env', async () => {
  const { config = {} } = await loadConfig('env', {
    cwd: 'envs',
  });
  assert.match(config['this is'], 'file');
});

test('find typescript env with multiple exts', async () => {
  const { config = {} } = await loadConfig('env', {
    cwd: 'envs',
    exts: ['.ts', '.json', '.mjs', '.cjs'],
  });
  assert.is(config['this is'], 'typescript file');
});

test('find commonjs env', async () => {
  const { config = {} } = await loadConfig('env', {
    cwd: 'envs',
    exts: ['.cjs'],
  });
  assert.is(config['this is'], 'common js file');
});

test('find js env', async () => {
  const { config = {} } = await loadConfig('env', {
    cwd: 'envs',
    exts: ['.js'],
  });
  assert.is(config['this is'], 'js file');
});

test('find ecmamodules env', async () => {
  const { config = {} } = await loadConfig('env', {
    cwd: 'envs',
    exts: ['.mjs'],
  });
  assert.is(config['this is'], 'ecmamodules file');
});

test('find json env', async () => {
  const { config = {} } = await loadConfig('env', {
    cwd: 'envs',
    exts: ['.json'],
  });
  assert.is(config['this is'], 'json(c) file');
});

test('find env from package.json', async () => {
  const { config = {} } = await loadConfig('env', {
    packageKey: 'publishConfig'
  });
  assert.is(config.access, 'public');
});

if (typeof process.env.TEST_JSON_ENV === 'string') {
  test('find env from process.env.TEST_JSON_ENV', async () => {
    const { config = {} } = await loadConfig('env', {
      processKey: 'TEST_JSON_ENV'
    });
    assert.is(config['this is'], 'process.env.TEST_JSON_ENV');
  });
}

test.run();
