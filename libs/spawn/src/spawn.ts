import { createLogger, getPackageName, joinArgs } from '@macrobe/cli-utils';
import { spawn as nativeSpawn, SpawnOptionsWithoutStdio } from 'child_process';

export interface SpawnOptions extends SpawnOptionsWithoutStdio {
  silence?: boolean;
  cwd?: string;
  log?: any; // Replace 'any' with the actual type of your logger
}

export function spawn(
  command: string,
  args: string[] = [],
  options: SpawnOptions = {},
): Promise<any> {
  const { silence, cwd = process.cwd(), log: initLogger, ...otherOptions } = options;
  const packageName = getPackageName({ cwd });

  // TODO: LOG_LEVEL & LSK_SILENT
  const log = initLogger || createLogger({ name: packageName });
  if (!silence) log.debug(`[>>] ${command} ${joinArgs(args)}`);

  return new Promise((resolve, reject) => {
    const proc = nativeSpawn(command, args, { cwd, ...otherOptions }) as any;
    if (proc.stdout) {
      proc.stdout.on('data', (data: string) => {
        const res = data.toString().trim();
        if (!silence) log.log(res);
      });
    }
    if (proc.stderr) {
      proc.stderr.on('data', (data: string) => {
        const res = data.toString().trim();
        if (!silence) log.error(res);
      });
    }
    proc.on('error', (err: any) => {
      if (!silence) {
        if (err && err.code === 'ENOENT') {
          log.fatal(`NO SUCH DIRECTORY: ${cwd}`, err);
          return;
        }
        log.fatal('[ERRRR]', err);
      }
      reject(err);
    });
    proc.on('exit', (code: string) => {
      if (!code) {
        resolve(proc);
        return;
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ command, args, cwd, options, proc, code });
    });
  });
}

export default spawn;
