import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

import { jsoncParse } from './jsoncParse';

export function loadJsoncSync(filepath: string) {
  const content = readFileSync(filepath, 'utf8');
  try {
    return jsoncParse(content);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse ${relative(process.cwd(), filepath)}: ${error.message}`);
    } else {
      throw error;
    }
  }
}
