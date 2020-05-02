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

function transformItems(find: FindMultiplierExpItem[], base: number): FindMultiplierResultItem[] {
  return find.map(({ pre, exp }) => ({
    pre,
    mul: pow(base, exp),
  }));
}

function sortItems(find: FindMultiplierExpItem[], base: number): FindMultiplierResultItem[] {
  return transformItems(find, base).sort(
    (a, b) => b.pre.length - a.pre.length,
  );
}

export function createMulFinder(unit?: string, find?: FindMultiplierOption, table?: DeprecatedTableItem[]): FindMultiplierFunction {

  if (isFunction(find)) {
    return find;
  }

  const findTable = find
    ? (
      typeof find === 'number'
        ? transformItems(defaultFindItems, find)
        : isArray(find)
          ? sortItems(find, 1000)
          : find.find
            ? sortItems(find.find, find.base || 1000)
            : transformItems(defaultFindItems, find.base || 1000)
    )
    : table
      ? sortItems(
        table.map(({ pre, power }) => ({ pre, exp: power })),
        10,
      )
      : transformItems(defaultFindItems, 1000);

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
