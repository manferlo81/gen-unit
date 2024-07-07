import { error } from '../common/error';
import { isFinite } from '../tools/is';

export function validateMultiplier(multiplier: number): number {

  // throw if multiplier is zero
  if (multiplier === 0) {
    throw error('Multiplier can\'t be zero');
  }

  // throw if multiplier is NaN | Infinity
  if (!isFinite(multiplier)) {
    throw error(`${multiplier} is not a valid multiplier`);
  }

  // return if multiplier is a non-zero, finite number
  return multiplier;

}
