import { pow } from './math'
import { RoundNumberFunction, RoundOptions } from './types'

function createRounder(options?: RoundOptions): RoundNumberFunction {

  const { dec: decOp, fixed } = options || {} as RoundOptions
  const dec = decOp != null ? +decOp : 4

  if (isNaN(dec) || !isFinite(dec) || dec < 0) {
    throw new TypeError('invalid "dec" option.')
  }

  if (fixed) {
    return (num: number): string => num.toFixed(dec)
  }

  const mul = pow(10, dec)
  return (num: number): number => Math.round(num * mul) / mul

}

export default createRounder
