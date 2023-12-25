// @ts-ignore
const safeWindow: any = typeof window !== 'undefined' ? window : null;
const safeProcess: any = typeof process !== 'undefined' ? process : null;
const env = safeProcess?.env || safeWindow?.env || {};

export const isServer = !safeWindow;
export const isClient = !isServer;
export const isDev = isServer ? env.NODE_ENV !== 'production' : Boolean(safeWindow?.__DEV__);
export const isProd = !isDev;
export const isDebug = isDev;
export const isTTY = Boolean(safeProcess?.stdout?.isTTY) || false;
// getEnvVar('STAGE', (isDev ? process.env.user : null))

export const stage =
  (isServer
    ? env.STAGE || (isDev ? env.user : null)
    : safeWindow?.env?.stage || safeWindow.__STAGE__) || 'development';

export const version =
  (isServer
    ? env.VERSION || env.CI_COMMIT_SHORT_SHA || env.CI_COMMIT_SHA
    : safeWindow?.env?.version) || stage;

export const isCI =
  isServer &&
  env.CI !== 'false' &&
  !!(
    (
      env.BUILD_ID || // Jenkins, Cloudbees
      env.BUILD_NUMBER || // Jenkins, TeamCity
      env.CI || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari
      env.CI_APP_ID || // Appflow
      env.CI_NAME || // Codeship and others
      env.RUN_ID
    ) // TaskCluster, dsari
  );

export default {
  isServer,
  isClient,
  isDev,
  isProd,
  isDebug,
  stage,
  version,
  isTTY,
  isCI,
};
