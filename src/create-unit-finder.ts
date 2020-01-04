import createLog from './create-log'
import { pow } from './math'
import { FindUnitFunction, TableItem } from './types'

export const defaultTable: TableItem[] = [
  { pre: 'T', power: 12 },
  { pre: 'G', power: 9 },
  { pre: 'M', power: 6 },
  { pre: 'K', power: 3 },
  { pre: '', power: 0 },
  { pre: 'm', power: -3 },
  { pre: '\u00b5', power: -6 },
  { pre: 'n', power: -9 },
  { pre: 'p', power: -12 },
  { pre: 'f', power: -15 },
]

function createUnitFinder(base: number, table?: TableItem[]): FindUnitFunction {

  const log = createLog(base)

  const table2 = table || defaultTable
  const find = (value: number): TableItem => {
    const pp = value ? Math.floor(log(value)) : 0
    const last = table2.length - 1
    for (let i = 0; i < last; i++) {
      const obj = table2[i]
      if (obj.power <= pp) {
        return obj
      }
    }
    return table2[last]
  }

  return (value: number): {
    div: number;
    pre: string;
  } => {
    const { power, pre } = find(value)
    return { div: pow(base, power), pre }
  }

}

export default createUnitFinder
