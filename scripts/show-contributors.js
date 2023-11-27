#!/usr/bin/env node

// #!/usr/bin/env node --loader ts-node/esm
import { map } from 'fishbird';
import { gitlogPromise } from 'gitlog';
import { createCommand } from 'ycmd';

const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    if (!acc[item[key]]) acc[item[key]] = [];
    acc[item[key]].push(item);
    return acc;
  }, {});

const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const min = (arr) => Math.min(...arr);
const max = (arr) => Math.max(...arr);

export default createCommand({
  command: 'show-contributors [-f]',
  describe: 'Show contributors in git projects',
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
  async main({ argv, log, cwd }) {
    const { format = 'table', path = cwd } = argv;
    const paths = path
      .split(',')
      .map((a) => a.trim().replace('~', process.env.HOME))
      .filter(Boolean);

    // eslint-disable-next-line no-shadow
    const res12 = await map(paths, async (path) => {
      try {
        const res = await gitlogPromise({
          repo: path,
          number: 100_000,
          execOptions: {
            maxBuffer: 100_000_000_000,
          },
          fields: ['authorName', 'authorEmail', 'authorDate'],
        });
        const byAuthors = groupBy(res, 'authorEmail');

        return Object.values(byAuthors).map((commits) => {
          const files = sum(commits.map((c) => c.files.length));
          const firstCommitedAt = min(commits.map((c) => new Date(c.authorDate)));
          const lastComiitedAt = max(commits.map((c) => new Date(c.authorDate)));
          const { authorName, authorEmail } = commits[0];
          return {
            path,
            authorName,
            authorEmail,
            commits: commits.length,
            files,
            firstCommitedAt: new Date(firstCommitedAt).toISOString(),
            lastComiitedAt: new Date(lastComiitedAt).toISOString(),
          };
        });
      } catch (err) {
        log.warn(path, 'err', err);
        return [];
      }
    });

    const res3 = res12
      .flat()
      .flat()
      // eslint-disable-next-line no-shadow
      .map(({ path, ...options }) => {
        // eslint-disable-next-line no-param-reassign
        path = path.replace(process.env.HOME, '~');
        const project = path.split('/')[2];
        // const licenseUrl = options.licensesPath && options.licenses[0] && options.licenses[0].url;
        return {
          path,
          project,
          ...options,
        };
      });

    if (format === 'json') {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(res3, null, 4));
    } else {
      // eslint-disable-next-line no-console
      console.table(res3);
    }
  },
});
