import { errorInvalidOption, rangeError } from '../common/error'
import { isFiniteNumber, isFunction, isNullish, isNumber, isObject } from '../common/is'
import type { AllowNullish } from '../common/private-types'
import type { FormatRoundOption, RoundFunction } from './types'

function validateNumberOfDecimals(dec: number): number {

  // throw if number of decimals is invalid
  if (!isFiniteNumber(dec) || dec < 0) throw rangeError(`Can't create round function with ${dec} decimal.`)

  // return valid number of decimals
  return dec

}

export function createRounderFromOptions(dec: number, fixed?: AllowNullish<boolean>): RoundFunction {

  // return fixed rounder function if fixed member set
  if (fixed) {
    return (num: number): string => {
      return num.toFixed(dec)
    }
  }
  // compute round multiplier
  const roundMultiplier = 10 ** dec

  // return regular rounder function
  return (num: number): number => {
    return Math.round(num * roundMultiplier) / roundMultiplier
  }

}

export function createRounder(round: FormatRoundOption): RoundFunction {

  // return default rounder if round option is nullish
  if (isNullish(round) || round === true) return createRounderFromOptions(2)

  // return user option if it's a function
  if (isFunction(round)) return round

  // return rounder with round option as number of decimals if it's a number
  if (isNumber(round)) {
    return createRounderFromOptions(
      validateNumberOfDecimals(round),
    )
  }

  if (round === false) return (n) => n

  // throw if round option is not an object at this point
  if (!isObject(round)) throw errorInvalidOption('round')

  // get members from advanced round option
  const { dec, fixed } = round

  if (isNullish(dec)) return createRounderFromOptions(2, fixed)

  // TODO: throw more descriptive error
  // throw if dec member is not a number
  if (!isNumber(dec)) throw errorInvalidOption('round')

  // return rounder based on advanced options
  return createRounderFromOptions(
    validateNumberOfDecimals(dec),
    fixed,
  )

}
