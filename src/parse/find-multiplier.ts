import { error, rangeError } from '../common/error'
import { createFindTable } from '../common/find-table'
import { isFiniteNumber, isFunction, isNullish, isNumber, isObject } from '../common/is'
import { defaultBase1000ParseExpItems } from './default-items'
import type { ParseFindMultiplierFunction, ParseFindMultiplierOption } from './types'
import { validateParseItems } from './user-items'

export function createMulFinder(find: ParseFindMultiplierOption): ParseFindMultiplierFunction {

  // return wrapped function if find option is a function
  // wrap function test for result validity
  if (isFunction(find)) {
    return (prefix, unit) => {

      // find multiplier
      const result = find(prefix, unit)

      // return undefined if no multiplier found (null | undefined)
      if (isNullish(result)) return

      // TODO: remove if future version
      // this feature was removed in version 0.1.0
      // throw error for removed feature
      if (isObject(result)) throw error('Function returning object is no longer supported, return a non-zero positive number, null or undefined.')

      // throw if multiplier is not valid
      if (!isNumber(result) || !isFiniteNumber(result) || result <= 0) throw rangeError(`${result} is not a valid multiplier`)

      // return multiplier
      return result

    }
  }

  // create find table
  const findTable = createFindTable(
    find,
    defaultBase1000ParseExpItems,
    validateParseItems,
  )

  // return function returning null if there are no items to search
  if (findTable.length === 0) return () => null

  // return multiplier finder function
  return (prefix: string) => {

    // return 1 as multiplier if captured prefix is empty
    if (!prefix) return 1

    const item = findTable.find(({ pre }) => pre === prefix)

    // return undefined if not multiplier found
    if (!item) return

    // return multiplier
    return item.mul

  }

}
