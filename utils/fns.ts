/* eslint-disable @typescript-eslint/no-unused-vars */
export function omit(keys, obj) {
  if (!keys.length) return obj;
  const { [keys.pop()]: omitted, ...rest } = obj;
  return omit(keys, rest);
}
