// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Anything = any;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type Void = void;

export type AnyFunction = (this: Anything, ...args: Anything[]) => Anything;
export type AnyArray = Anything[];

export type TypeCheckFunction<B> = <T extends B>(value: unknown) => value is T;

export type AllowNull<T> = T | null;
export type AllowNullish<T> = AllowNull<T> | undefined;

export type AllowReturnNullish<T> = AllowNullish<T> | Void;
