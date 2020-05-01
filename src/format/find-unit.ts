import { isFunction } from '../tools/is-function';
import { pow } from '../tools/math';
import { DeprecatedTableItem } from '../types';
import { FindUnitExpResult, FindUnitFunction, FindUnitOption, FindUnitResult } from './types';

function sortFindUnitArray(units: Array<FindUnitResult | FindUnitExpResult>, base: number): FindUnitResult[] {
  return units
    .map<FindUnitResult>((item) => ({
      pre: item.pre,
      div: 'exp' in item ? pow(base, item.exp) : item.div,
    }))
    .sort(
      (a, b) => (b.div - a.div),
    );
}

const unity = { pre: '', div: 1 };

const defaultFindResults = [
  { exp: 4, pre: 'T' },
  { exp: 3, pre: 'G' },
  { exp: 2, pre: 'M' },
  { exp: 1, pre: 'K' },
  unity,
  { exp: -1, pre: 'm' },
  { exp: -2, pre: '\u00b5' },
  { exp: -3, pre: 'n' },
  { exp: -4, pre: 'p' },
  { exp: -5, pre: 'f' },
];

export function createUnitFinder(find?: FindUnitOption, table?: DeprecatedTableItem[]): FindUnitFunction {

  if (isFunction(find)) {
    return find;
  }

  const results: FindUnitResult[] = !find
    ? (
      table
        ? sortFindUnitArray(
          table.map(({ pre, power }) => ({ pre, exp: power })),
          10,
        )
        : sortFindUnitArray(defaultFindResults, 1000)
    )
    : Array.isArray(find)
      ? sortFindUnitArray(find, 1000)
      : sortFindUnitArray(find.find || defaultFindResults, find.base || 1000);

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
