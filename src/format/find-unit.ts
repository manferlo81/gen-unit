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

export function createUnitFinder(find?: FindUnitOption, table?: DeprecatedTableItem[]): FindUnitFunction {

  if (isFunction(find)) {
    return find;
  }

  const unity = { pre: '', div: 1 };

  const results: FindUnitResult[] = !find
    ? (
      table
        ? sortFindUnitArray(
          table.map(({ pre, power }) => ({ pre, exp: power })),
          10,
        )
        : [
          { div: 1e12, pre: 'T' },
          { div: 1e9, pre: 'G' },
          { div: 1e6, pre: 'M' },
          { div: 1e3, pre: 'K' },
          unity,
          { div: 1e-3, pre: 'm' },
          { div: 1e-6, pre: '\u00b5' },
          { div: 1e-9, pre: 'n' },
          { div: 1e-12, pre: 'p' },
          { div: 1e-15, pre: 'f' },
        ]
    )
    : Array.isArray(find)
      ? sortFindUnitArray(find, 1000)
      : sortFindUnitArray(find.find, find.base);

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
