import { CreateFormatterOptions, TableItem } from './types'
import { ln } from './math'
import createRounder from './create-rounder'

function sortByPower(a: TableItem, b: TableItem): number {
  return b.power - a.power
}

const defaultTable = 'T:12;G:9;M:6;K:3;:0;m:-3;\u00b5:-6;n:-9;p:-12;f:-15'
  .split(';')
  .map<TableItem>((s) => {
    const [pre, pow] = s.split(':')
    return { power: +pow, pre }
  })
  .sort(sortByPower)

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
  } = options || {} as CreateFormatterOptions

  const decimals = decOp != null ? +decOp : 4

  if (isNaN(decimals) || !isFinite(decimals)) {
    throw new TypeError('invalid "dec" option.')
  }

  const unit = unitOp || ''
  const table = tableOp || defaultTable
  const dec = decimals
  const base = 10

  const round = createRounder(dec, fixed)

  return (value: number): string => {
    const unitObj = findUnit(baseLog(value, base), table)
    const val = value / 10 ** unitObj.power
    const rounded = round(val)
    const wholeUnit = unitObj.pre + unit
    return `${rounded}${wholeUnit ? ` ${wholeUnit}` : ''}`
  }

}
