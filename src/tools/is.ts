import type { AnyFunction, Anything, TypeCheckFunction } from './helper-types';

interface typeofMap {
  number: number;
  object: object;
  function: AnyFunction;
}

type TypeOfResult = keyof typeofMap;

function isType<K extends TypeOfResult>(type: K): TypeCheckFunction<typeofMap[K]> {
  return <T extends typeofMap[K]>(value: unknown): value is T => {
    return typeof value === type;
  };
}

export const isFunction = isType('function');

export const isObject = isType('object');
export const { isArray } = Array as { isArray: TypeCheckFunction<Anything[]> };

export const isNumber = isType('number');
export const { isFinite } = Number;
