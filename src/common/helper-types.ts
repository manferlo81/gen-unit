// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type Void = void;

export type TypeCheckFunction<T> = (value: unknown) => value is T;

export type Nullish = null | undefined | Void;
export type AllowNullish<T> = T | Nullish;
