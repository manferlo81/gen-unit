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

type UnitFinder = (value: number) => TableItem

function createUnitFinder(base: number, table?: TableItem[]): (value: number) => { mul: number; pre: string } {

  const table2 = table || defaultTable

  return (value: number): { mul: number; pre: string } => {

    const pp = log(value, base)
    const len = table2.length - 1

    for (let i = 0; i < len; i++) {
      const obj = table2[i]
      if (obj.power <= pp) {
        return { mul: pow(base, obj.power), pre: obj.pre }
      }
    }

    return { mul: pow(base, table2[len].power), pre: table2[len].pre }

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
      round(value / unitObj.mul),
      unitObj.pre + unit,
    )
  }

}
