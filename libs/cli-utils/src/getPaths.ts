import path from 'path';

import { getLskConfig } from './getLskConfig.js';
import { getNpmGlobal } from './getNpmGlobal.js';
import { GetPathsParams } from './types.js';

export const getPaths = (params: GetPathsParams = {}): string[] => {
  const { cwd = process.cwd(), name = '' } = params;
  const scriptPath = `scripts/run/${name}`;
  const lskrc = params.lskrc !== false ? getLskConfig({ cwd }) : {};
  const pathexecConfig = lskrc?.pathexec;
  const dirs = pathexecConfig ? pathexecConfig.dirs : 4;
  const local = pathexecConfig ? pathexecConfig.local : true;
  const nodemodules = pathexecConfig ? pathexecConfig.nodemodules : true;
  const exts = params.exts || [''];
  const paths = (pathexecConfig?.paths || [])
    .map((prefix: any) => exts.map((ext) => path.resolve(`${prefix}/${scriptPath}${ext}`)))
    .flat();
  if (paths.length) return paths;

  const globalNodemodules = [getNpmGlobal(), `/usr/local/lib`].filter(Boolean);
  const nodemodulesPostfix = '/node_modules/@lskjs/cli-scripts';

  if (local) {
    [...Array(dirs)].forEach((_, deep) => {
      const dir = `${cwd}/${'../'.repeat(deep)}`;
      paths.push(...exts.map((ext) => path.resolve(`${dir}/${scriptPath}${ext}`)));
      if (nodemodules) {
        paths.push(
          ...exts.map((ext) => path.resolve(`${dir}/${nodemodulesPostfix}/${scriptPath}${ext}`)),
        );
      }
    });
  }
  if (nodemodules) {
    paths.push(
      ...exts.map((ext) =>
        path.resolve(
          `${process.env.HOME}/projects/lskjs-cli/packages/cli-scripts/${scriptPath}${ext}`,
        ),
      ),
    );
    globalNodemodules.forEach((dir) => {
      paths.push(
        ...exts.map((ext) => path.resolve(`${dir}${nodemodulesPostfix}/${scriptPath}${ext}`)),
      );
    });
    globalNodemodules.forEach((dir) => {
      paths.push(
        ...exts.map((ext) =>
          path.resolve(`${dir}/node_modules/@lskjs/cli/${nodemodulesPostfix}/${scriptPath}${ext}`),
        ),
      );
    });
    globalNodemodules.forEach((dir) => {
      paths.push(
        ...exts.map((ext) =>
          path.resolve(
            `${dir}/node_modules/lsk/node_modules/@lskjs/cli/${nodemodulesPostfix}/${scriptPath}${ext}`,
          ),
        ),
      );
    });
  }

  return paths;
};
