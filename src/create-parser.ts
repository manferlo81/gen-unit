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

type MulFinder = (unit: string) => number

function createMulFinder(table: TableItem[], unitOp?: string): MulFinder {

  if (!unitOp) {

    return (unit: string): number => {

      for (let i = 0, len = table.length; i < len; i++) {
        const obj = table[i]
        if (unit === obj.pre) {
          return pow(10, obj.power)
        }
      }

      return NaN

    }

  }

  return (unit: string): number => {

    if (unit === unitOp) {
      return 1
    }

    for (let i = 0, len = table.length; i < len; i++) {
      const obj = table[i]
      if (unit === obj.pre || unit === `${obj.pre}${unitOp}`) {
        return pow(10, obj.power)
      }
    }

    return NaN

  }

}

export function createParser(options?: CreateParserOptions): ParseFunction {

  const op = options || {} as CreateParserOptions

  const table = op.table || defaultTable
  const findMul = createMulFinder(table, op.unit)

  return (input: ParseInput): number => {

    if (typeof input === 'number') {
      return input
    }

    const asString = `${input}`
    const asNum = +asString

    if (!isNaN(asNum)) {
      return asNum
    }

    const result = /^\s*(-?[.\d]+(?:e[+-]?\d+)?)\s*(\w*)\s*$/.exec(asString)

    if (!result) {
      return NaN
    }

    const [, valueAsStr, unit] = result
    const valueAsNum = +valueAsStr

    if (isNaN(valueAsNum)) {
      return NaN
    }

    const mul = findMul(unit)

    if (isNaN(mul)) {
      return NaN
    }

    return valueAsNum * mul

  }

}
