export const commonOptions = {
  watch: {
    alias: 'w',
    describe: 'monitor files for changes',
    type: 'boolean',
    default: false,
  },
  prod: {
    alias: 'p',
    describe: 'enable code optimization for production',
    type: 'boolean',
    default: false,
  },
  silent: {
    alias: ['s', 'q', 'quiet'],
    describe: 'run in silent mode, show errors only',
    type: 'boolean',
    default: false,
  },
  exec: {
    alias: 'e',
    describe: 'executes after compilation',
    type: ['boolean', 'string'],
    default: false,
  },
  dry: {
    alias: ['d', 'dry-run', 'without-publish'],
    describe: 'run in dry mode, without publishing',
    type: 'boolean',
    default: false,
  },
  dist: {
    describe: 'specify the output directory',
    type: 'string',
  },
  force: {
    alias: ['f'],
    describe: 'force to run',
    type: 'boolean',
    default: false,
  },
  dts: {
    describe: 'generate dts files',
    type: 'boolean',
    default: true,
  },
  yes: {
    alias: ['y'],
    describe: 'automatically say yes to all prompts',
    type: 'boolean',
    default: false,
  },
  bail: {
    alias: 'b',
    describe: 'stop running  after the first failure',
    type: 'boolean',
    default: false,
  },
  clean: {
    alias: 'c',
    describe: 'clean the output directory before building',
    type: 'boolean',
    default: false,
  },
} as Record<string, any>;
