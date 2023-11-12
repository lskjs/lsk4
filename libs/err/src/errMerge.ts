import { errProps } from './errProps.js';

type ErrorLike = {
  code?: string;
  message?: string;
  [name: string]: any;
};

export const errMerge = (...args: any[]): ErrorLike => {
  const [params1, params2] = args;
  let params: ErrorLike = {};
  if (typeof params1 === 'string') {
    params.code = params1;
    if (typeof params2 === 'string') {
      params.message = params2;
    }
  }
  args.forEach((p) => {
    params = {
      ...params,
      ...errProps(p),
    };
  });
  return params;
};

export default errMerge;
