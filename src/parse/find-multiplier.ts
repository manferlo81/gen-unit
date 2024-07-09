import { error } from '../common/error';
import { AllowNullish } from '../tools/helper-types';
import { isFiniteNumber, isFunction, isNumber, isObject } from '../tools/is';
import { createFindTable } from './find-table';
import type { ParseFindMultiplierFunction, ParseFindMultiplierOption } from './types';

/**
 * Creates a function which should return de multiplier based on captured unit
 *
 * @param find "find" option
 * @returns find multiplier function
 */
export function createMulFinder(find: AllowNullish<ParseFindMultiplierOption>): ParseFindMultiplierFunction {

  // if "find" is a function
  if (isFunction(find)) {

    return (pre, unit) => {

      // find multiplier
      const result = find(pre, unit);

      // return null if no multiplier found (null | undefined)
      if (result == null) {
        return null;
      }

      if (isObject(result)) {
        throw error('Function returning object is no longer supported, return a non-zero number, null or undefined.');
      }

      if (!isNumber(result) || !isFiniteNumber(result) || result <= 0) {
        throw error(`${result} is not a valid multiplier`);
      }

      return result;

    };
  }

  const findTable = createFindTable(find);

  return (pre: string) => {

    // return 1 as multiplier if captured prefix is empty
    if (!pre) {
      return 1;
    }

    const item = findTable.find(({ pre: prefix }) => prefix === pre);

    // return null if not multiplier found
    if (!item) {
      return null;
    }

    const { mul: multiplier } = item;

    // return multiplier
    return multiplier;

  };

}
