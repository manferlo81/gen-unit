import { type DeprecatedTableItem } from '../common/deprecated';
import { error } from '../common/error';
import { isFunction } from '../tools/is-function';
import { isNumber } from '../tools/is-number';
import { createFindTable_deprecated } from './find-table';
import { type FindMultiplierFunction, type FindMultiplierOption } from './types';
import { validateMultiplier } from './validate-multiplier';

export function createMulFinder(unit?: string, find?: FindMultiplierOption, table?: DeprecatedTableItem[]): FindMultiplierFunction {

  // if find is a function
  if (isFunction(find)) {

    return (capturedHoleUnit) => {

      // find multiplier
      const result = find(capturedHoleUnit);

      // return null if no multiplier found
      if (result == null) {
        return null;
      }

      // if multiplier is a number
      if (isNumber(result)) {
        return validateMultiplier(result);
      }

      // throw if multiplier is not an object
      if (typeof result !== 'object') {
        throw error(`function should return a non-zero number, null or undefined. got ${result as string}`);
      }

      // get multiplier from object
      const { mul: multiplier } = result;

      if (multiplier == null) {
        return null;
      }

      // throw if multiplier is not a number
      if (!isNumber(multiplier)) {
        throw error(`${multiplier} is not a valid multiplier`);
      }

      return validateMultiplier(multiplier);

    };
  }

  const findTable = createFindTable_deprecated(unit, find, table);

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
