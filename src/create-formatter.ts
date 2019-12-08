import createRounder from './create-rounder'
import { log, pow } from './math'
import { CreateFormatterOptions, Formatter, TableItem } from './types'

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

function createUnitFinder(base: number, table?: TableItem[]): UnitFinder {

  const table2 = table || defaultTable

  return (value: number): TableItem => {

    const pow = log(value, base)
    const len = table2.length - 1

    for (let i = 0; i < len; i++) {
      const obj = table2[i]
      if (obj.power <= pow) {
        return obj
      }
    }

    return table2[len]

  }

}

function format(value: string, unit: string): string {
  return `${value}${unit ? ` ${unit}` : ''}`
}

export function createFormatter(options?: CreateFormatterOptions): Formatter {

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
      round(value / pow(base, unitObj.power)),
      unitObj.pre + unit,
    )
  }

}
