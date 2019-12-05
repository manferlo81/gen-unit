import { CreateFormatterOptions, TableItem } from './types'
import { ln } from './math'
import createRounder from './create-rounder'

const defaultTable: TableItem[] = [
  { pre: 'T', power: 4 },
  { pre: 'G', power: 3 },
  { pre: 'M', power: 2 },
  { pre: 'K', power: 1 },
  { pre: '', power: 0 },
  { pre: 'm', power: -1 },
  { pre: '\u00b5', power: -2 },
  { pre: 'n', power: -3 },
  { pre: 'p', power: -4 },
  { pre: 'f', power: -5 },
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
    table: tableOp,
    dec: decOp,
    fixed,
    round: roundOp,
  } = options || {} as CreateFormatterOptions

  const round = createRounder(roundOp || { dec: decOp, fixed })

  const unit = unitOp || ''
  const table = tableOp || defaultTable
  const base = 1000

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
