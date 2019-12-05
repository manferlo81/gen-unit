import { CreateFormatterOptions, TableItem } from './types'
import { ln } from './math'
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

function findUnit(pow: number, table: TableItem[]): TableItem {
  return table.find(({ power }) => power <= pow) || table[table.length - 1]
}

function baseLog(value: number, base: number): number {
  const n = Math.abs(value)
  return value ? Math.floor(ln(n) / ln(base)) : 0
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

  const format = (value: string, unit: string): string => {
    return `${value}${unit ? ` ${unit}` : ''}`
  }

  return (value: number): string => {
    const unitObj = findUnit(baseLog(value, base), table)
    return format(
      round(value / base ** unitObj.power),
      unitObj.pre + unit,
    )
  }

}
