import { RoundNumberFunction, RoundOptions } from './types'
import { pow } from './math'

function createRounder(options?: RoundOptions | RoundNumberFunction): RoundNumberFunction {

  if (typeof options === 'function') {
    return options
  }

  const { dec: decOp, fixed } = options || {}
  const dec = decOp != null ? +decOp : 4

  if (isNaN(dec) || !isFinite(dec)) {
    throw new TypeError('invalid "dec" option.')
  }

  if (fixed) {
    return (num: number): string => num.toFixed(dec)
  }

  const mul = pow(10, dec)
  return (num: number): string => `${Math.round(num * mul) / mul}`

}

export default createRounder
