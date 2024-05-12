// eslint-disable-next-line import/no-extraneous-dependencies
import type { DumpOptions } from 'js-yaml';
import { dump } from 'js-yaml';

export type JsonToYamlOptions = DumpOptions;

export function jsonToYaml(data: any, options: JsonToYamlOptions = {}) {
  // const fn = options.safe ? yaml.safeDump : yaml.dump;
  return dump(data, { indent: 2, skipInvalid: false, flowLevel: -1, ...options });
}

export default jsonToYaml;
