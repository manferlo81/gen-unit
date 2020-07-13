// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (this: any, ...args: any[]) => any;

export function isFunction<F extends AnyFunction>(value: unknown): value is F {
  return typeof value === 'function';
}
