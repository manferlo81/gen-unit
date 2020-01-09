import { FindUnitFunction, FindUnitResult } from './formatter-types'

function createUnitFinder(table: FindUnitResult[], unity: FindUnitResult): FindUnitFunction {

  return (value: number): FindUnitResult => {

    if (!value) {
      return unity
    }

    const last = table.length - 1
    for (let i = 0; i < last; i++) {
      const obj = table[i]
      if (value >= obj.div) {
        return obj
      }
    }

    return table[last]

  }

}

export default createUnitFinder
