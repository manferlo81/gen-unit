import createUnitFinder from './create-unit-finder'
import { FindUnitFunction, FindUnitResult } from './formatter-types'
import { pow } from './math'
import sortFindUnitArray from './sort-find-unit-array'
import { TableItem } from './types'

function createLegacyUnitFinder(table?: TableItem[]): FindUnitFunction {

  const unity = { pre: '', div: 1 }

  if (!table) {
    return createUnitFinder(
      [
        { pre: 'T', div: 1e12 },
        { pre: 'G', div: 1e9 },
        { pre: 'M', div: 1e6 },
        { pre: 'K', div: 1e3 },
        unity,
        { pre: 'm', div: 1e-3 },
        { pre: '\u00b5', div: 1e-6 },
        { pre: 'n', div: 1e-9 },
        { pre: 'p', div: 1e-12 },
        { pre: 'f', div: 1e-15 },
      ],
      unity,
    )
  }

  return createUnitFinder(
    sortFindUnitArray(
      table.map<FindUnitResult>(
        ({ pre, power }) => ({ pre, div: pow(10, power) }),
      ),
    ),
    unity,
  )

}

export default createLegacyUnitFinder
