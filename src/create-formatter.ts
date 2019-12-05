import { CreateFormatterOptions, TableItem } from './types'
import { ln, pow } from './math'
import createRounder from './create-rounder'

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

function baseLog(value: number, base: number): number {
  return value ? Math.floor(ln(Math.abs(value)) / ln(base)) : 0
}

function createFindUnit(base: number, table: TableItem[]): (value: number) => TableItem {

  return (value: number): TableItem => {

    const pow = baseLog(value, base)
    const len = table.length - 1

    for (let i = 0; i < len; i++) {
      const obj = table[i]
      if (obj.power <= pow) {
        return obj
      }
    }

    return table[len]

  }

}

function format(value: string, unit: string): string {
  return `${value}${unit ? ` ${unit}` : ''}`
}

export function createFormatter(options?: CreateFormatterOptions): (value: number) => string {

  const {
    unit: unitOp,
    round: roundOp,
    table: deprecatedTable,
    dec: deprecatedDec,
    fixed: deprecatedFixed,
  } = options || {} as CreateFormatterOptions

  const round = createRounder(roundOp || { dec: deprecatedDec, fixed: deprecatedFixed })

  const unit = unitOp || ''
  const table = deprecatedTable || defaultTable
  const base = 10

  const findUnit = createFindUnit(base, table)

  return (value: number): string => {
    const unitObj = findUnit(value)
    return format(
      round(value / pow(base, unitObj.power)),
      unitObj.pre + unit,
    )
  }

}
