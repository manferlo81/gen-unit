export type Nullish<T = never> = T | null | undefined

export type TypeCheckFunction<T> = (value: unknown) => value is T
