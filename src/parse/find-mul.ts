import { isArray } from '../tools/is-array';
import { isFunction } from '../tools/is-function';
import { pow } from '../tools/math';
import { DeprecatedTableItem } from '../types';
import { FindMultiplierExpItem, FindMultiplierFunction, FindMultiplierOption, FindMultiplierResultItem } from './types';

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

function f1(find: FindMultiplierExpItem[], base: number): FindMultiplierResultItem[] {
  return find.map(({ pre, exp }) => ({
    pre,
    mul: pow(base, exp),
  }));
}

export function createMulFinder(unit?: string, find?: FindMultiplierOption, table?: DeprecatedTableItem[]): FindMultiplierFunction {

  if (isFunction(find)) {
    return find;
  }

  const findTable = find
    ? (
      typeof find === 'number'
        ? f1(defaultFindItems, find)
        : isArray(find)
          ? f1(find, 1000)
          : f1(find.find || defaultFindItems, find.base || 1000)
    )
    : table
      ? table.map(({ pre, power }) => ({ pre, mul: pow(10, power) }))
      : f1(defaultFindItems, 1000);

  if (!unit) {

    return (capturedUnit: string): number => {

      for (let i = 0, len = findTable.length; i < len; i++) {
        const obj = findTable[i];
        if (capturedUnit === obj.pre) {
          return obj.mul;
        }
      }

      return NaN;

    };

  }

  return (capturedUnit: string): number => {

    if (capturedUnit === unit) {
      return 1;
    }

    for (let i = 0, len = findTable.length; i < len; i++) {
      const obj = findTable[i];
      if (capturedUnit === obj.pre || capturedUnit === `${obj.pre}${unit}`) {
        return obj.mul;
      }
    }

    return NaN;

  };

}
