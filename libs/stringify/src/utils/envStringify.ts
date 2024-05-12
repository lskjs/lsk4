import { mapValues } from '@lsk4/algos';

export function envStringify(json: Record<string, unknown> | string | Array<string>) {
  if (typeof json === 'string') return json;
  if (Array.isArray(json)) return json.join('\n');
  return Object.values(mapValues(json, (value, key) => `${key}=${value}`)).join('\n');
}
