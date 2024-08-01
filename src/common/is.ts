import type { AnyArray, AnyFunction, Nullish, TypeCheckFunction } from './helper-types';

interface TypeOfMap {
  number: number;
  object: object;
  function: AnyFunction;
}

type TypeOfResult = keyof TypeOfMap;

function isType<K extends TypeOfResult>(type: K): TypeCheckFunction<TypeOfMap[K]> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  return <T extends TypeOfMap[K]>(value: unknown): value is T => {
    return typeof value === type;
  };
}

export function isNullish(value: unknown): value is Nullish {
  return value == null;
}

export const isFunction = isType('function');

export const isObject = isType('object');
export const { isArray } = Array as { isArray: TypeCheckFunction<AnyArray> };

export const isNumber = isType('number');
export const { isFinite: isFiniteNumber } = Number;
