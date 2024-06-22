import { hasOwn } from '../tools/helpers';
import { isArray } from '../tools/is-array';
import { isFunction } from '../tools/is-function';
import { isNumber } from '../tools/is-number';
import { pow } from '../tools/math';
import { isNaN } from '../tools/number';
import { DeprecatedTableItem } from '../types';
import { DeclarativeFindMultiplierOption, FindMultiplierExpItem, FindMultiplierFunction, FindMultiplierOption, MultiplierFound } from './types';

// default find multiplier exponent list
const defaultFindItems: FindMultiplierExpItem[] = [
  { pre: 'meg', exp: 2 },
  { pre: 'f', exp: -5 },
  { pre: 'p', exp: -4 },
  { pre: 'n', exp: -3 },
  { pre: 'u', exp: -2 },
  { pre: 'm', exp: -1 },
  { pre: 'k', exp: 1 },
  { pre: 'K', exp: 1 },
  { pre: 'M', exp: 2 },
  { pre: 'G', exp: 3 },
  { pre: 'T', exp: 4 },
];

function transformItems(find: FindMultiplierExpItem[], base: number, unit?: string): Record<string, number> {

  const populate: (result: Record<string, number>, pre: string, value: number) => void = unit
    ? (result, pre, value): void => {
      result[pre] = value;
      result[pre + unit] = value;
    }
    : (result, pre, value): void => {
      result[pre] = value;
    };

  return find.reduce<Record<string, number>>(
    (result, { pre, exp }) => {
      populate(result, pre, pow(base, exp));
      return result;
    },
    {},
  );

}

function createFindTable(unit?: string, find?: DeclarativeFindMultiplierOption, table?: DeprecatedTableItem[]) {
  const findTable = find
    ? (
      isNumber(find)
        ? transformItems(defaultFindItems, find, unit)
        : isArray(find)
          ? transformItems(find, 1000, unit)
          : find.find
            ? transformItems(find.find, find.base || 1000, unit)
            : transformItems(defaultFindItems, find.base || 1000, unit)
    )
    : table
      ? transformItems(
        table.map(({ pre, power }) => ({ pre, exp: power })),
        10,
        unit,
      )
      : transformItems(defaultFindItems, 1000, unit);
  return findTable;
}

export function createMulFinder(unit?: string, find?: FindMultiplierOption, table?: DeprecatedTableItem[]): FindMultiplierFunction {

  // if find is a function
  if (isFunction(find)) {

    return (capturedHoleUnit: string): MultiplierFound | null => {

      // find multiplier
      const result = find(capturedHoleUnit);

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

      // if no multiplier found, return null
      if (result == null) {
        return null;
      }

      // if multiplier is not an object, throw Error
      if (typeof result !== 'object') {
        throw new TypeError(`${result as string} if not a valid multiplier`);
      }

      // return multiplier object
      return result;

    };
  }

  const findTable = createFindTable(unit, find, table);

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
