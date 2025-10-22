type ExtendsTernary<A, B, C, D> = A extends B ? C : D
type LooseEquals<A, B> = ExtendsTernary<A, B, ExtendsTernary<B, A, true, false>, false>

export type And<T extends readonly boolean[]> = ExtendsTernary<string, T[number], false, true>
export type Or<T extends readonly boolean[]> = ExtendsTernary<true, T[number], true, false>
export type Not<T extends boolean> = ExtendsTernary<T, true, false, true>

export type AssignableTo<A extends B, B> = ExtendsTernary<A, B, true, false>
export type Equals<A, B extends A> = LooseEquals<A, B>

export type KeysEquals<T extends object, K extends keyof T> = LooseEquals<keyof T, K>
export type EqualsOptional<P, V extends P> = LooseEquals<Exclude<P, undefined>, V>

export type Expect<T extends true> = T
