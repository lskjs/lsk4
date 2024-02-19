import { isCommonJS } from './utils/isCommonJS.js';

export const allowedExtensions = ['.ts', '.json', '.cjs', '.mjs', '.js'];

export const defaultExtensions = allowedExtensions.filter((ext) => {
  if (isCommonJS()) return ext !== '.mjs';
  return true;
});
