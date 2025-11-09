#!/usr/bin/env tsx
// #!/usr/bin/env -S node --import tsx
// #!/usr/bin/env node
import { join } from 'node:path';
import { build, Options as TsdownOptions } from 'tsdown';

import { createCommand, getCwdInfo, rmDirs, shellParallel } from 'ycmd';

// const asd: any = 123;

import { commonOptions } from './utils/commonOptions.js';
import { defaultOptions as def } from './utils/defaultOptions.js';
import { writePackageJsonModules } from './utils/writePackageJsonModules.js';
import { lazyLog } from '@lsk4/log';
import { map } from 'fishbird';

export default createCommand({
  command: 'build:ts [-w][-p][-s][-e]',
  describe: 'build TS project',
  builder: (yargs) =>
    yargs.options({
      watch: commonOptions.watch,
      prod: commonOptions.prod,
      silent: commonOptions.silent,
      exec: commonOptions.exec,
      dts: commonOptions.dts,
      dist: commonOptions.dist,
      clean: commonOptions.clean,
    }),

  // meta: import.meta,
  async main({ isRoot, ctx, cwd, log, argv }: any) {
    if (isRoot) {
      await shellParallel(`ycmd build:ts`, { ctx, argv });
      return;
    }
    const {
      prod: isProd = def.isProd,
      silent: isSilent = def.isSilent,
      clean: isClean = false,
      watch: isWatch = false,
      dts: isDts = true,
    } = argv;
    const { exec: isExec = isWatch && (await getCwdInfo({ cwd })).isApp } = argv;

    const optionsTsdown: TsdownOptions = {
      entry: ['src/**/*.ts', 'src/**/*.tsx'],
      // format: 'esm',
      // outDir: 'lib-tsdown',
      // name: 'ycmd',
      watch: isWatch,
      clean: isClean,
      minify: isProd,
      silent: isSilent,
      // config: join(cwd, 'presets/tsup2.config.ts'),


      // shims: false,
      dts: true,
      sourcemap: true,

      // entryPoints: ['src/index.ts'],
      // outdir: 'lib',
      // minify: true,
      // legacyOutput: true,
      // splitting: true,
      // splitting: true,
      // format: ['cjs', 'esm'],
      // dts: true,
      // sourcemap: true,
      // entryPoints: ['src/index.ts'],
      // outdir: 'lib',
      // minify: true,
      // legacyOutput: true,
      // splitting: true,

      format: 'esm',
      outDir: 'lib-tsdown',
    };
    if (!isDts) optionsTsdown.dts = false;
    // console.log('optionsTsdown', optionsTsdown);

    if (true) {
      const formats = ['cjs', 'esm'];
      await map(formats, async (format) => {
        const options = {
          ...optionsTsdown,
          format: format as 'cjs' | 'esm',
          outDir: format === 'cjs' ? 'cjs' : 'lib',
          name: format,
          outExtensions(opts){
            return ({ js: '.js', dts: '.d.ts' })
          }
        } satisfies TsdownOptions;
        await build(options);
      });
      return;
    }
  },
});
