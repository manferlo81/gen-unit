import { FindUnitFunction, FindUnitResult } from './formatter-types'
import { pow } from './math'
import { TableItem } from './types'

function createModernUnitFinder(table: FindUnitResult[], unity: FindUnitResult): FindUnitFunction {

  return (value: number): FindUnitResult => {

    if (!value) {
      return unity
    }

    const last = table.length - 1
    for (let i = 0; i < last; i++) {
      const obj = table[i]
      if (value >= obj.div) {
        return obj
      }
    }

    return table[last]

  }

}

function createUnitFinder(table?: TableItem[]): FindUnitFunction {

  const unity = { pre: '', div: 1 }

  if (!table) {
    return createModernUnitFinder(
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

  return createModernUnitFinder(
    table.map<FindUnitResult>(
      ({ pre, power }) => ({ pre, div: pow(10, power) }),
    ).sort((a, b) => (b.div - a.div)),
    unity,
  )

}

export default createUnitFinder
