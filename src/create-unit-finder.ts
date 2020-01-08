import { FindUnitFunction, FindUnitResult } from './formatter-types'
import { pow } from './math'
import { TableItem } from './types'

function createUnitFinder(table?: TableItem[]): FindUnitFunction {

  if (!table) {

    return (value: number): FindUnitResult => {

      const r0: FindUnitResult = { pre: '', div: 1 }

      if (!value) {
        return r0
      }

      const table2: FindUnitResult[] = [
        { pre: 'T', div: 1e12 },
        { pre: 'G', div: 1e9 },
        { pre: 'M', div: 1e6 },
        { pre: 'K', div: 1e3 },
        r0,
        { pre: 'm', div: 1e-3 },
        { pre: '\u00b5', div: 1e-6 },
        { pre: 'n', div: 1e-9 },
        { pre: 'p', div: 1e-12 },
        { pre: 'f', div: 1e-15 },
      ]

      const last = table2.length - 1
      for (let i = 0; i < last; i++) {
        const obj = table2[i]
        if (value >= obj.div) {
          return obj
        }
      }

      return table2[last]

    }

  }

  const find = (value: number): TableItem => {
    const pp = value ? Math.floor(Math.log10(value)) : 0
    const last = table.length - 1
    for (let i = 0; i < last; i++) {
      const obj = table[i]
      if (obj.power <= pp) {
        return obj
      }
    }
    return table[last]
  }

  return (value: number): FindUnitResult => {
    const { power, pre } = find(value)
    return { div: pow(10, power), pre }
  }

}

export default createUnitFinder
