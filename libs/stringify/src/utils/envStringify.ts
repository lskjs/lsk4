import { mapValues } from '@lsk4/algos';

export function envStringify(json: Record<string, unknown>) {
  return Object.values(mapValues(json, (value, key) => `${key}=${value}`)).join('\n');
}
