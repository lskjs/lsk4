/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */

// declare global {
//   interface Window {}
// }

export const getEnvVar = <T>(name: string, def: T | null = null): string | T | null => {
  const envs =
    // @ts-ignore
    typeof process !== 'undefined' ? process.env : typeof window !== 'undefined' ? window : {};
  return envs[name] || def;
};

export default getEnvVar;
