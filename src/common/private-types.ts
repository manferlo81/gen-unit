// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type Void = void

export type Nullish = null | undefined
export type NullishReturn = Nullish | Void

export type AllowNullish<T> = T | Nullish
export type AllowNullishReturn<T> = T | NullishReturn

export type TypeCheckFunction<T> = (value: unknown) => value is T

export interface WithUnit<U> {
  readonly unit: U
}

export interface WithOptionalFind<F> {
  readonly find?: F
}
