// TODO: make more efficient
export function isEqualObjects(a: any, b: any) {
  // console.log('=====================');
  // console.log(JSON.stringify(a));
  // console.log('=====================');
  // console.log(JSON.stringify(b));
  // console.log('=====================');
  return JSON.stringify(a) === JSON.stringify(b);
}
