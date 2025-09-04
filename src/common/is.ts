import type { NullishReturn, TypeCheckFunction } from './private-types'

export function isNullish(value: unknown): value is NullishReturn {
  return value == null
}

interface TypeOfMap {
  number: number
  object: object | null
  function: CallableFunction
}

function isType<T extends keyof TypeOfMap>(type: T): TypeCheckFunction<TypeOfMap[T]> {
  return (value: unknown): value is TypeOfMap[T] => {
    return typeof value === type
  }
}

export const isNumber = isType('number')
export const isObject = isType('object')
export const isFunction = isType('function')

type UnknownArray = unknown[] | readonly unknown[]
export const isArray = Array.isArray as TypeCheckFunction<UnknownArray>

export const isFiniteNumber = Number.isFinite as {
  (value: number): boolean
  (value: unknown): value is number
}
