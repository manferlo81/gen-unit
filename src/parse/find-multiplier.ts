import { error } from '../common/error';
import { isFunction } from '../tools/is-function';
import { isNumber } from '../tools/is-number';
import { createFindTable } from './find-table';
import type { FindMultiplierFunction, FindMultiplierOption } from './types';
import { validateMultiplier } from './validate-multiplier';

export function createMulFinder(unit?: string, find?: FindMultiplierOption): FindMultiplierFunction {

  // if "find" is a function
  if (isFunction(find)) {

    return (capturedHoleUnit) => {

      // find multiplier
      const result = find(capturedHoleUnit);

      // return null if no multiplier found (null | undefined)
      if (result == null) {
        return null;
      }

      // throw if multiplier is not a number
      if (!isNumber(result)) {
        const should = 'return a non-zero number, null or undefined';
        if (typeof result === 'object') {
          throw error(`Function returning object is no longer supported, ${should}.`);
        }
        throw error(`Function should ${should}. Got ${result}`);
      }

      // if multiplier is a number
      return validateMultiplier(result);

    };
  }

  const findTable = createFindTable(unit, find);

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
