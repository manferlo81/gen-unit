import { isNaN } from '../tools/number';

export function validateMultiplier(multiplier: number): number {

  // throw if multiplier is zero
  if (multiplier === 0) {
    throw new TypeError('Multiplier can\'t be zero');
  }

  // throw if multiplier is NaN
  if (isNaN(multiplier)) {
    throw new TypeError('multiplier is NaN');
  }

  return multiplier;

}
