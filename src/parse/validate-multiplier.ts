import { error } from '../common/error';
import { isNaN } from '../tools/number';

export function validateMultiplier(multiplier: number): number {

  // throw if multiplier is zero
  if (multiplier === 0) {
    throw error('Multiplier can\'t be zero');
  }

  // throw if multiplier is NaN
  if (isNaN(multiplier)) {
    throw error('multiplier is NaN');
  }

  return multiplier;

}
