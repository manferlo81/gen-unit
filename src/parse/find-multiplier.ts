import { error } from '../common/error';
import { isFinite, isFunction, isNumber, isObject } from '../tools/is';
import { createFindTable } from './find-table';
import type { ParseFindMultiplierFunction, ParseFindMultiplierOption } from './types';

/**
 * Creates a function which should return de multiplier based on captured unit
 *
 * @param find "find" option
 * @param unit "unit" option
 * @returns find multiplier function
 */
export function createMulFinder(find?: ParseFindMultiplierOption, unit?: string): ParseFindMultiplierFunction {

  // if "find" is a function
  if (isFunction(find)) {

    return (capturedHoleUnit) => {

      // find multiplier
      const result = find(capturedHoleUnit);

      // return null if no multiplier found (null | undefined)
      if (result == null) {
        return null;
      }

      if (isObject(result)) {
        throw error('Function returning object is no longer supported, return a non-zero number, null or undefined.');
      }

      if (!isNumber(result) || result <= 0 || !isFinite(result)) {
        throw error(`${result} is not a valid multiplier`);
      }

      return result;

    };
  }

  const findTable = createFindTable(find, unit);

  return (capturedHoleUnit: string) => {

    // if captured unit equals unit, return 1 as multiplier
    if (capturedHoleUnit === unit) {
      return 1;
    }

    const multiplier = findTable[capturedHoleUnit];

    // return null if not multiplier found
    if (!multiplier) {
      return null;
    }

    // return multiplier
    return multiplier;

  };

}
