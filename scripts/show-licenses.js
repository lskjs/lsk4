#!/usr/bin/env node
import { omit } from '@lskjs/algos';
import { map } from 'fishbird';
import checker from 'license-checker';
import { join } from 'path';
import { createCommand, readJson } from 'ycmd';

const check = (options = {}) =>
  new Promise((resolve, reject) => {
    checker.init(options, (err, packages) => {
      if (err) {
        reject(err);
      } else {
        resolve(packages);
      }
    });
  });

const mapObjects = (obj, fn) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {});
};

const parseName = (name) => {
  if (name[0] === '@') {
    const r = parseName(name.slice(1));
    r.name = `@${r.name}`;
    return r;
  }
  const [n, v] = name.split('@');
  return { name: n, version: v };
};

const keyBy = (arr, key) =>
  arr.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});

export default createCommand({
  command: 'license-check [-f]',
  describe: 'Check project licenses',
  builder: (yargs) =>
    yargs.options({
      format: {
        alias: 'f',
        describe: 'format of output',
        choices: ['table', 'json'],
        default: 'table',
      },
      path: {
        alias: 'p',
        describe: 'paths of directories comma separated',
      },
    }),

  meta: import.meta,
  async main({ argv, log, cwd } = {}) {
    const { format = 'table', path = cwd } = argv;
    const paths = path
      .split(',')
      .map((a) => a.trim().replace('~', process.env.HOME))
      .filter(Boolean);

    const packagesLists = await map(paths, async (packagePath) => {
      try {
        const packageJsonPath = join(packagePath, 'package.json');
        const packageJson = readJson(packageJsonPath);
        const deps = [
          { type: 'deps', values: packageJson.dependencies },
          { type: 'devDeps', values: packageJson.devDependencies },
          { type: 'optDeps', values: packageJson.optionalDependencies },
          { type: 'peerDeps', values: packageJson.peerDependencies },
        ].filter(({ values }) => values && Object.keys(values).length > 0);

        const raw = await check({ start: packagePath });
        const res = mapObjects(raw, (props, pname) => {
          const { name, version } = parseName(pname);
          return { name, version, ...props };
        });
        const packagesByName = keyBy(Object.values(res), 'name');

        return deps.flatMap(({ type, values }) =>
          Object.keys(values || {}).map((name) => {
            const version = values[name];
            return {
              packagePath,
              name,
              version,
              type,
              ...omit(packagesByName[name], ['name', 'version']),
            };
          }),
        );
      } catch (err) {
        log.warn(packagePath, 'err', err);
        return [];
      }
    });

    const rpackages = packagesLists.flat();
    const packages = rpackages.map(({ packagePath, ...options }) => {
      const packagePath2 = packagePath.replace(process.env.HOME, '~');
      const project = packagePath2.split('/')[2];
      const packageName = packagePath2.split('/').slice(3).join('/');
      return {
        packagePath: packagePath2,
        project,
        package: packageName,
        ...options,
        npmUrl: `https://www.npmjs.com/package/${options.name}`,
      };
    });

    if (format === 'json') {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(packages, null, 4));
    } else {
      // eslint-disable-next-line no-console
      console.table(packages);
    }
  },
});
