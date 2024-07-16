// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Anything = any;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type Void = void;

export type AnyFunction = (this: Anything, ...args: Anything[]) => Anything;
export type AnyArray = Anything[];

export type TypeCheckFunction<B> = <T extends B>(value: unknown) => value is T;

export type Nullish = null | undefined | Void;
export type AllowNullish<T> = T | Nullish;
