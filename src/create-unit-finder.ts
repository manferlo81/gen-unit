import { createLegacyUnitFinder } from './create-unit-finder-legacy'
import { FindUnitFunction, FindUnitOption, FindUnitResult } from './formatter-types'
import { isFunction } from './is-function'
import { sortFindUnitArray } from './sort-find-unit-array'
import { TableItem } from './types'

export function createUnitFinder2(find?: FindUnitOption, table?: TableItem[]): FindUnitFunction {

  if (isFunction(find)) {
    return find
  }

  const unity = { pre: '', div: 1 }

  if (!find && table) {
    return createLegacyUnitFinder(table)
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
