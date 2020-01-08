import { pow } from './math'
import { isNaN } from './number'
import { CreateParserOptions, ParseFunction, ParseInput } from './parser-types'
import { TableItem } from './types'

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

type Transformer = (val: number, unit: string) => number

function createTransformer(table: TableItem[], unitOp?: string): Transformer {

  if (!unitOp) {

    return (val: number, unit: string): number => {

      for (let i = 0, len = table.length; i < len; i++) {
        const obj = table[i]
        if (unit === obj.pre) {
          return val * pow(10, obj.power)
        }
      }

      return NaN

    }

  }

  return (val: number, unit: string): number => {

    if (unit === unitOp) {
      return val
    }

    for (let i = 0, len = table.length; i < len; i++) {
      const obj = table[i]
      if (unit === obj.pre || unit === (obj.pre + unitOp)) {
        return val * pow(10, obj.power)
      }
    }

    return NaN

  }

}

export function createParser(options?: CreateParserOptions): ParseFunction {

  const op = options || {} as CreateParserOptions

  const table = op.table || defaultTable
  const transform = createTransformer(table, op.unit)

  return (input: ParseInput): number => {

    if (typeof input === 'number') {
      return input
    }

    const asString = `${input}`
    const asNum = +asString

    if (!isNaN(asNum)) {
      return asNum
    }

    const result = /^\s*(-?[0-9e\-.]+)\s*(\w*)\s*$/.exec(asString)

    if (!result) {
      return NaN
    }

    const [, valueStr, unit] = result
    const asNum2 = +valueStr

    if (isNaN(asNum2)) {
      return asNum2
    }

    return transform(asNum2, unit)

  }

}
