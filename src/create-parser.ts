import { CreateParserOptions, TableItem } from './types'

const defaultTable: TableItem[] = [
  { pre: 'meg', power: 6 },
  { pre: 'f', power: -15 },
  { pre: 'p', power: -12 },
  { pre: 'n', power: -9 },
  { pre: 'u', power: -6 },
  { pre: 'm', power: -3 },
  { pre: 'k', power: 3 },
  { pre: 'K', power: 3 },
  { pre: 'M', power: 6 },
  { pre: 'G', power: 9 },
  { pre: 'T', power: 12 },
]

function createTransformer(base: number, table: TableItem[], unitOp?: string): (val: number, unit: string) => (number | null) {

  return (val: number, unit: string): (number | null) => {

    if (unitOp && unit === unitOp) {
      return val
    }

    for (const { pre, power } of table) {
      if (unit === pre || (unitOp && unit === (pre + unitOp))) {
        return val * base ** power
      }
    }

    return null

  }

}

export function createParser(options?: CreateParserOptions): (input: string | number | object) => (number | null) {

  const {
    unit: unitOp,
    table: deprecatedTableOptions,
  } = options || {} as CreateParserOptions

  const table = deprecatedTableOptions || defaultTable
  const base = 10
  const transform = createTransformer(base, table, unitOp)

  return (input: string | number | object): (number | null) => {

    const asString = `${input}`
    const asNum = +asString

    if (!isNaN(asNum)) {
      return asNum
    }

    const result = /^\s*(-?\d+\.?\d*)\s*(\w*)\s*$/.exec(asString)

    if (!result) {
      return null
    }

    const [, valueStr, unit] = result
    return transform(+valueStr, unit)

  }

}
