import { isCI, isDev } from 'ycmd';

export const defaultOptions = {
  isSilent: !!+process.env.YCMD_SILENT || isCI,
  isBail: isCI,
  isProd: !!+process.env.YCMD_PROD || !isDev,
  isCjs: true,
  libDir: 'lib',
  cjsDir: 'cjs',
};
