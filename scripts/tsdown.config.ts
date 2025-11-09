import { defineConfig } from 'tsdown';
import type { Options } from 'tsdown';

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  outDir: 'lib',
  dts: true,
  // splitting: false,
  clean: true,
  sourcemap: true,
  logLevel: 'error',
} satisfies Options);