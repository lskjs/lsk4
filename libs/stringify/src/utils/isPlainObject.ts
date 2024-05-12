// const isPlainObject = (obj: any) => obj && typeof obj === 'object' && obj.constructor === Object;
export const isPlainObject = (obj: any) => typeof obj === 'object' && !Array.isArray(obj);
