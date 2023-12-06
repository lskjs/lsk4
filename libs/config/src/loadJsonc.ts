import { readFile } from 'node:fs/promises';
import { relative } from 'node:path';

import { jsoncParse } from './jsoncParse';

export async function loadJsonc(filepath: string) {
  const content = await readFile(filepath, 'utf8');
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
