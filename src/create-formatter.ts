import createRounder from './create-rounder'
import { log, pow } from './math'
import { CreateFormatterOptions, FormatFunction, TableItem } from './types'

const defaultTable: TableItem[] = [
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

function createUnitFinder(base: number, table?: TableItem[]): (value: number) => { div: number; pre: string } {

  const table2 = table || defaultTable

  const find = (value: number): TableItem => {

    const pp = log(value, base)
    const last = table2.length - 1

    for (let i = 0; i < last; i++) {
      const obj = table2[i]
      if (obj.power <= pp) {
        return obj
      }
    }

    return table2[last]

  }

  return (value: number): { div: number; pre: string } => {
    const { power, pre } = find(value)
    return { div: pow(base, power), pre }
  }

}

function format(value: string | number, unit: string): string {
  return `${value}${unit ? ` ${unit}` : ''}`
}

export function createFormatter(options?: CreateFormatterOptions): FormatFunction {

  const {
    unit: unitOp,
    round: roundOp,
    table: deprecatedTable,
    dec: deprecatedDec,
    fixed: deprecatedFixed,
  } = options || {} as CreateFormatterOptions

  const unit = unitOp || ''
  const base = 10
  const findUnit = createUnitFinder(base, deprecatedTable)
  const round = createRounder(roundOp || { dec: deprecatedDec, fixed: deprecatedFixed })

  return (value: number): string => {
    const unitObj = findUnit(value)
    return format(
      round(value / unitObj.div),
      `${unitObj.pre}${unit}`,
    )
  }

}
