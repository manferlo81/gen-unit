import { pow } from './math'
import { CreateParserOptions, ParseFunction, TableItem } from './types'

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

  if (!unitOp) {

    return (val: number, unit: string): (number | null) => {

      for (let i = 0, len = table.length; i < len; i++) {
        const obj = table[i]
        if (unit === obj.pre) {
          return val * pow(base, obj.power)
        }
      }

      return null

    }

  }

  return (val: number, unit: string): (number | null) => {

    if (unit === unitOp) {
      return val
    }

    for (let i = 0, len = table.length; i < len; i++) {
      const obj = table[i]
      if (unit === obj.pre || unit === (obj.pre + unitOp)) {
        return val * pow(base, obj.power)
      }
    }

    return null

  }

}

export function createParser(options?: CreateParserOptions): ParseFunction {

  const {
    unit: unitOp,
    table: deprecatedTable,
  } = options || {} as CreateParserOptions

  const table = deprecatedTable || defaultTable
  const base = 10
  const transform = createTransformer(base, table, unitOp)

  return (input: string | number | object): (number | null) => {

    const asString = `${input}`
    const asNum = +asString

    if (!isNaN(asNum)) {
      return asNum
    }

    const result = /^\s*(-?[0-9e\-.]+)\s*(\w*)\s*$/.exec(asString)

    if (!result) {
      return null
    }

    const [, valueStr, unit] = result
    const asNum2 = +valueStr

    if (isNaN(asNum2)) {
      return null
    }

    return transform(asNum2, unit)

  }

}
