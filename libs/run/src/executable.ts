import { getLskConfig, joinArgs, log } from '@macrobe/cli-utils';
import path from 'path';

import { LskrunProcess, MainCommand, MainFunction, RootRun } from './types.js';
import { wrapMain } from './wrapMain.js';

type RunParams =
  | MainFunction
  | {
      main: MainFunction;
    }
  | MainCommand;

const isCommand = (c: any) => c?.command && (c.main || c.handler);

/**
 * Это функция, обертка, которая позволяет запускать функцию main в разных сценариях.
 *
 * @param main
 * @returns
 */
export const executable = async (params: RunParams): Promise<any> => {
  let main: MainFunction;
  if (typeof params === 'function') {
    main = params;
  } else if (isCommand(params)) {
    // if(typeof params.main == 'function') {
    // }
    // @ts-ignore
    main = params.main;
  } else if (typeof params === 'object' && typeof params.main === 'function') {
    main = params.main;
  }
  const proc = process as LskrunProcess;
  let isExec = false;
  if (!proc.lskrun) {
    isExec = true;
    // TODO: подумать про command
    const [shell, filename, ...args] = proc.argv;
    const config = getLskConfig();
    const cwd = proc.cwd();
    const ctx = {
      stack: [
        {
          command: `lsk ${joinArgs(args)}`,
          log,
        },
      ],
    };
    proc.lskrun = {
      startedAt: new Date(),
      shell,
      filename,
      args,
      cwd,
      isRoot: Boolean(config?.path && path.dirname(config?.path) === cwd),
      config,
      log,
      ctx,
    } as RootRun;
  }
  const wrappedMain = await wrapMain(main);

  if (!isExec) {
    if (isCommands) return;
  }
  try {
    const res = await wrappedMain();
    return res;
  } catch (err) {
    log.error('[exec]', err);
    throw err;
  }
};
