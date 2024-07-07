import { error } from '../common/error';
import { isFinite } from '../tools/is';

export function validateMultiplier(multiplier: number): number {

  // throw if multiplier is zero
  if (multiplier === 0) {
    throw error('Multiplier can\'t be zero');
  }

  // throw if multiplier is NaN
  if (!isFinite(multiplier)) {
    throw error('Multiplier is NaN');
  }

  return multiplier;

}
