// TODO: add jsonc
// TODO: add csv
// TODO: add jsonEachRow
export type FileFormat = 'json' | 'cjs' | 'esm' | 'yml' | 'env';

export interface CommentProps {
  source?: string;
  url?: string;
  filename?: string;
  name?: string;
  date?: Date;
  footer?: string;
  values?: Array<[string, string] | []>;
}
