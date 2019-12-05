import { NumberRounderFunction } from './types'

function createRounder(dec: number, fixed: unknown): NumberRounderFunction {
  if (fixed) {
    return (num: number): string => num.toFixed(dec)
  }
  const mul = 10 ** dec
  return (num: number): string => `${Math.round(num * mul) / mul}`
}

export default createRounder
