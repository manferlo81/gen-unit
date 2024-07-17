import { error, rangeError } from '../common/error';
import { createFindTable } from '../common/find-table';
import { isFiniteNumber, isFunction, isNullish, isNumber, isObject } from '../common/is';
import { defaultBase1000ParseExpItems } from './default-items';
import type { ParseFindMultiplierFunction, ParseFindMultiplierOption } from './types';
import { validateParseItems } from './user-items';

export function createMulFinder(find: ParseFindMultiplierOption): ParseFindMultiplierFunction {

  // if "find" is a function
  if (isFunction(find)) return (pre, unit) => {

    // find multiplier
    const result = find(pre, unit);

    // return undefined if no multiplier found (null | undefined)
    if (isNullish(result)) return;

    // TODO: remove if future version
    // this feature was removed in version 0.1.0
    // throw error for removed feature
    if (isObject(result)) throw error('Function returning object is no longer supported, return a non-zero number, null or undefined.');

    // throw if multiplier is not valid
    if (!isNumber(result) || !isFiniteNumber(result) || result <= 0) throw rangeError(`${result} is not a valid multiplier`);

    // return multiplier
    return result;

  };

  const findTable = createFindTable(
    find,
    defaultBase1000ParseExpItems,
    validateParseItems,
  );

  if (findTable.length == 0) return () => null;

  return (pre: string) => {

    // return 1 as multiplier if captured prefix is empty
    if (!pre) return 1;

    const item = findTable.find(({ pre: prefix }) => prefix === pre);

    // return undefined if not multiplier found
    if (!item) return;

    const { mul: multiplier } = item;

    // return multiplier
    return multiplier;

  };

}
