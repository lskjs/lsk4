import { findPath } from './findPath.js';

export const findBin = (command: string): string => {
  if (command === 'babel') {
    return findPath('node_modules/@babel/cli/bin/babel.js') || `npx ${command}`;
  }
  const path = findPath(`node_modules/.bin/${command}`);
  if (path) return path;
  return `npx ${command}`;
};
