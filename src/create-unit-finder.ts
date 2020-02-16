import { FindUnitFunction, FindUnitResult } from './formatter-types'

export function createUnitFinder(table: FindUnitResult[], unity: FindUnitResult): FindUnitFunction {

  return (value: number): FindUnitResult => {

    if (!value) {
      return unity
    }

    const val = Math.abs(value)

    const last = table.length - 1
    for (let i = 0; i < last; i++) {
      const obj = table[i]
      if (val >= obj.div) {
        return obj
      }
    }

    return table[last]

  }

}
