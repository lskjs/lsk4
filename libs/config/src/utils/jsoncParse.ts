import strip from 'strip-json-comments';

export function jsoncParse(data: string) {
  try {
    // eslint-disable-next-line no-new-func
    return new Function(`return ${strip(data).trim()}`)();
  } catch {
    // Silently ignore any error
    // That's what tsc/jsonc-parser did after all
    return {};
  }
}
