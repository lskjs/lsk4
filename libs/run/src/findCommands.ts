// import { map } from '@macrobe/async';
import { getPaths } from '@macrobe/cli-utils';
import Bluebird from 'bluebird';
import { readdir, readFile } from 'fs/promises';

import { MainCommand } from './types.js';
import { CommandModule } from 'yargs';

const { map } = Bluebird;

// const items = [1, 2, 3, 4];
// const res = await map(items, async (item) => item);
// const res2 = await Bluebird.map(items, async (item) => item);

type FindCommandOptions = {
  exts?: string[];
  nodemodules?: boolean;
  local?: boolean;
};

// console.log(res, res2);
export const findCommands = async (initPathOptions: FindCommandOptions): Promise<CommandModule[]> => {
  const { exts, ...pathOptions } = initPathOptions;

  const dirs = await getPaths();

  // @ts-ignore
  const rawCommands = await map(dirs, async (dir: string) => {
    try {
      const rawFiles = await readdir(dir);
      return rawFiles
        .filter((file) => (exts || []).some((ext: string) => file.endsWith(ext)))
        .map((file) => ({
          name: file.replace(/\.[^/.]+$/, ''), // TODO:: подумать
          path: `${dir}/${file}`,
        }));
    } catch (err) {
      // console.log('[err]', err)
      return [];
    }
  }).then((c) => c.flat());

  type CommandMap = Record<string, { path: string; name: string; content?: any }>;
  const commandMaps: CommandMap = {};
  rawCommands.forEach((c: any) => {
    if (commandMaps[c.name]) {
      return;
    }
    commandMaps[c.name] = c;
  });

  await map(Object.values(commandMaps), async (c) => {
    const rawContent = await readFile(c.path);

    if (rawContent.includes('export default') && rawContent.includes('command:')) {
      const content = await import(c.path);
      // console.log('[content]', content, rawCommands, c.name);
      commandMaps[c.name].content = content.default || content;
    }

    // if (rawContent.includes('export const')) {
    //   const content = await import(c.path);
    //   rawCommands[c.name].content = content;
    //   return;
    // }

    // const content: any = await import(c.path);
    // rawCommands[c.name].content = content;
  });

  const dynamicCommands = Object.values(commandMaps).filter((c) => c.content).map(command => {
    if (command.main && !command.handler) {

      
      return {
        ...command,
        handler: command.main,
      }
    }

  });



  return dynamicCommands.map((c: any) => c.content);
};
