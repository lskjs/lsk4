import getEnvVar from './getEnvVar.js';
import { tryParamParse } from './tryParamParse.js';

export const getEnvParam = (name: string, def: any = null): any =>
  tryParamParse(getEnvVar(name), def);

export default getEnvParam;
