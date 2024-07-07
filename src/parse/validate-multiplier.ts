import { error } from '../common/error';
import { isFinite } from '../tools/is';

export function validateMultiplier(multiplier: number): number {

  // throw if multiplier is negative, zero, NaN  or Infinity
  if (multiplier <= 0 || !isFinite(multiplier)) {
    throw error(`${multiplier} is not a valid multiplier`);
  }

  // return if multiplier is a non-zero, finite number
  return multiplier;

}
