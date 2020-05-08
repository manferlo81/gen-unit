import { hasOwn } from '../tools/helpers';
import { isArray } from '../tools/is-array';
import { isFunction } from '../tools/is-function';
import { isNumber } from '../tools/is-number';
import { pow } from '../tools/math';
import { DeprecatedTableItem } from '../types';
import { FindMultiplierExpItem, FindMultiplierFunction, FindMultiplierOption } from './types';

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

export function createMulFinder(unit?: string, find?: FindMultiplierOption, table?: DeprecatedTableItem[]): FindMultiplierFunction {

  if (isFunction(find)) {
    return find;
  }

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

  return (capturedUnit: string): number => {

    if (capturedUnit === unit) {
      return 1;
    }

    if (hasOwn.call(findTable, capturedUnit)) {
      return findTable[capturedUnit];
    }

    return NaN;

  };

}
