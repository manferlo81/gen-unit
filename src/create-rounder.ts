import { RoundAdvancedOptions, RoundFunction } from './formatter-types'
import { pow } from './math'
import { isFinite, isNaN } from './number'

function createRounder(options: RoundAdvancedOptions): RoundFunction {

  const { dec: decOp, fixed } = options
  const dec = decOp != null ? +decOp : 2

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
