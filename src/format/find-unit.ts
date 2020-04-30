import { isFunction } from '../tools/is-function'
import { DeprecatedTableItem } from '../types'
import { FindUnitExpResult, FindUnitFunction, FindUnitOption, FindUnitResult } from './types'

function sortFindUnitArray(units: Array<FindUnitResult | FindUnitExpResult>, base: number): FindUnitResult[] {
  return units
    .map<FindUnitResult>(
      (item) => ({ pre: item.pre, div: 'exp' in item ? Math.pow(base, item.exp) : item.div }),
    )
    .sort(
      (a, b) => (b.div - a.div),
    )
}

export function createUnitFinder(find?: FindUnitOption, table?: DeprecatedTableItem[]): FindUnitFunction {

  if (isFunction(find)) {
    return find
  }

  const unity = { pre: '', div: 1 }

  if (!find && table) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return createUnitFinderFromTable(table)
  }

  const results: FindUnitResult[] = !find
    ? sortFindUnitArray([
      { exp: 4, pre: 'T' },
      { exp: 3, pre: 'G' },
      { exp: 2, pre: 'M' },
      { exp: 1, pre: 'K' },
      { exp: 0, pre: '' },
      { exp: -1, pre: 'm' },
      { exp: -2, pre: '\u00b5' },
      { exp: -3, pre: 'n' },
      { exp: -4, pre: 'p' },
      { exp: -5, pre: 'f' },
    ], 1000)
    : Array.isArray(find)
      ? sortFindUnitArray(find, 10)
      : sortFindUnitArray(find.find, find.base)

  return (value): FindUnitResult => {

    if (!value) {
      return unity
    }

    const val = Math.abs(value)

    const lastIndex = results.length - 1
    for (let i = 0; i < lastIndex; i++) {
      const obj = results[i]
      if (val >= obj.div) {
        return obj
      }
    }

    return results[lastIndex] || unity

  }

}

export function createUnitFinderFromTable(table: DeprecatedTableItem[]): FindUnitFunction {
  return createUnitFinder({
    base: 10,
    find: table.map<FindUnitExpResult>(({ pre, power }) => ({ pre, exp: power })),
  })
}
