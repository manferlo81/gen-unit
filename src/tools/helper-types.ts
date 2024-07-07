// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Anything = any;
export type AnyFunction = (this: Anything, ...args: Anything[]) => Anything;

export type TypeCheckFunction<B> = <T extends B>(value: unknown) => value is T;

export type AllowNull<T> = T | null;
export type AllowNullish<T> = AllowNull<T> | undefined;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AllowReturnNullish<T> = AllowNullish<T> | void;
