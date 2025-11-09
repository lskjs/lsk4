import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export const writeFileAndDir = async (path: string, content: string) => {
  const dir = join(path, '..');
  await mkdir(dir, { recursive: true });
  await writeFile(path, content);
};
