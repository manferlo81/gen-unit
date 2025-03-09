import { rangeError } from './error'
import { isFiniteNumber } from './is'
import type { ExponentFindItems, MultiplierFindItems } from './types'

export function transformFindItems(items: ExponentFindItems, base: number): MultiplierFindItems {
  return items.map(({ pre, exp }) => {

    // compute multiplier
    const mul = base ** exp

    // throw if multiplier is invalid
    if (!isFiniteNumber(mul) || mul <= 0) throw rangeError(`${base} to the power of ${exp} is not a valid multiplier`)

    // return multiplier item
    return { pre, mul }

  })
}
