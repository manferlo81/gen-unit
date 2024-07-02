import { DeprecatedTableItem } from '../common/deprecated';
import { hasOwn } from '../tools/helpers';
import { isFunction } from '../tools/is-function';
import { isNumber } from '../tools/is-number';
import { isNaN } from '../tools/number';
import { __createFindTable } from './find-table';
import { InternalFindMultiplierFunction, MultiplierFound } from './internal-types';
import { FindMultiplierOption } from './types';

export function createMulFinder(unit?: string, find?: FindMultiplierOption, table?: DeprecatedTableItem[]): InternalFindMultiplierFunction {

  // if find is a function
  if (isFunction(find)) {

    return (capturedHoleUnit: string): MultiplierFound | null => {

      // find multiplier
      const result = find(capturedHoleUnit);

      // if no multiplier found, return null
      if (result == null) {
        return null;
      }

      // if multiplier is a number
      if (isNumber(result)) {

        // if multiplier is 0, throw Error
        if (result === 0) {
          throw new TypeError('Multiplier can\'t be zero');
        }

        // if multiplier is NaN, return null (no multiplier found)
        // otherwise return multiplier object
        return isNaN(result) ? null : { mul: result };

      }

      // throw if multiplier is not an object
      if (typeof result !== 'object') {
        throw new TypeError(`function should return a number, { mul: number } or null. got ${result as string}`);
      }

      // get multiplier from object
      const { mul } = result;

      // throw if multiplier is not a number
      if (!isNumber(mul)) {
        throw new TypeError(`${mul} is not a valid multiplier`);
      }

      // throw if multiplier is zero
      if (mul === 0) {
        throw new TypeError('Multiplier can\'t be zero');
      }

      // return multiplier object
      return result;

    };
  }

  const findTable = __createFindTable(unit, find, table);

  return (capturedHoleUnit: string): MultiplierFound | null => {

    // if captured unit equals unit, return 1 as multiplier
    if (capturedHoleUnit === unit) {
      return { mul: 1 };
    }

    // if table contains captured unit, return corresponding multiplier
    if (hasOwn.call(findTable, capturedHoleUnit)) {
      return { mul: findTable[capturedHoleUnit] };
    }

    // return null if not multiplier found
    return null;

  };

}
