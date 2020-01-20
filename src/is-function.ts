// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction<F extends ((this: any, ...args: any[]) => any)>(x: unknown): x is F {
  return typeof x === 'function'
}
