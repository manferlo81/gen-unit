import { CreateParserOptions, TableItem } from './types'

function sortByPreLength(a: TableItem, b: TableItem): number {
  return b.pre.length - a.pre.length
}

const defaultTable = 'f:-15;p:-12;n:-9;u:-6;m:-3;k:3;K:3;M:6;meg:6;G:9;T:12'
  .split(';')
  .map<TableItem>((s) => {
    const [pre, pow] = s.split(':')
    return { pre, power: +pow }
  })
  .sort(sortByPreLength)

export function createParser(options?: CreateParserOptions) {

  const {
    unit: unitOp,
    table: tableOp,
  } = options || {} as CreateParserOptions

  const table = tableOp || defaultTable

  return (input: string | number | object) => {

    const asString = `${input}`
    const asNum = +asString

    if (!isNaN(asNum)) {
      return asNum
    }

    const result = /^\s*(\-?\d+\.?\d*)\s*(\w*)\s*$/.exec(asString)

    if (!result) {
      return null
    }

    const [, valueStr, unit] = result
    const val = +valueStr

    if (unitOp && unit === unitOp) {
      return val
    }

    for (const { pre, power } of table) {
      if (unit === pre || (unitOp && unit === (pre + unitOp))) {
        return val * 10 ** power
      }
    }

    return null

  }

}
