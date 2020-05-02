import { MICRO } from '../consts';
import { isArray } from '../tools/is-array';
import { isFunction } from '../tools/is-function';
import { pow } from '../tools/math';
import { DeprecatedTableItem } from '../types';
import { FindUnitExpItem, FindUnitFunction, FindUnitOption, FindUnitResult } from './types';

function transformFindUnitArray(units: FindUnitExpItem[], base: number): FindUnitResult[] {
  return units
    .map<FindUnitResult>((item) => ({
      pre: item.pre,
      div: pow(base, item.exp),
    }));
}

function sortFindUnitArray(units: FindUnitExpItem[], base: number): FindUnitResult[] {
  return transformFindUnitArray(units, base).sort(
    (a, b) => (b.div - a.div),
  );
}

const unity = { pre: '', div: 1 };

const defaultFindResults = [
  { exp: 4, pre: 'T' },
  { exp: 3, pre: 'G' },
  { exp: 2, pre: 'M' },
  { exp: 1, pre: 'K' },
  { exp: 0, pre: '' },
  { exp: -1, pre: 'm' },
  { exp: -2, pre: MICRO },
  { exp: -3, pre: 'n' },
  { exp: -4, pre: 'p' },
  { exp: -5, pre: 'f' },
];

export function createUnitFinder(find?: FindUnitOption, table?: DeprecatedTableItem[]): FindUnitFunction {

  if (isFunction(find)) {
    return find;
  }

  const results: FindUnitResult[] = find
    ? (
      typeof find === 'number'
        ? transformFindUnitArray(defaultFindResults, find)
        : isArray(find)
          ? sortFindUnitArray(find, 1000)
          : find.find
            ? sortFindUnitArray(find.find, find.base || 1000)
            : transformFindUnitArray(defaultFindResults, find.base || 1000)
    )
    : table
      ? sortFindUnitArray(
        table.map(({ pre, power }) => ({ pre, exp: power })),
        10,
      )
      : transformFindUnitArray(defaultFindResults, 1000);

  return (value): FindUnitResult => {

    if (!value) {
      return unity;
    }

    const val = Math.abs(value);

    const lastIndex = results.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      const obj = results[i];
      if (val >= obj.div) {
        return obj;
      }
    }

    return results[lastIndex] || unity;

  };

}
