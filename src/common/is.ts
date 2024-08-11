import type { Nullish, TypeCheckFunction } from './helper-types';

export function isNullish(value: unknown): value is Nullish {
  return value == null;
}

function isType(type: 'number'): TypeCheckFunction<number>;
function isType(type: 'object'): TypeCheckFunction<object>;
function isType(type: 'function'): TypeCheckFunction<CallableFunction>;
function isType(type: string) {
  return (value: unknown) => {
    return typeof value === type;
  };
}

export const isNumber = isType('number');
export const isObject = isType('object');
export const isFunction = isType('function');

interface ExtendedArrayConstructor extends ArrayConstructor {
  isArray: TypeCheckFunction<unknown[]>;
}

export const { isArray } = Array as ExtendedArrayConstructor;

interface ExtendedNumberConstructor extends NumberConstructor {
  isFinite: TypeCheckFunction<number>;
}

export const { isFinite: isFiniteNumber } = Number as ExtendedNumberConstructor;
