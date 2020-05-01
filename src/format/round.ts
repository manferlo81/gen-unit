import { pow } from '../tools/math';
import { isFinite, isNaN } from '../tools/number';
import { AdvancedRoundOptions, RoundFunction } from './types';

export function createRounder(options: AdvancedRoundOptions): RoundFunction {

  const { dec: decOp, fixed } = options;
  const dec = decOp != null ? +decOp : 2;

  if (isNaN(dec) || !isFinite(dec) || dec < 0) {
    throw new TypeError('invalid "dec" option.');
  }

  if (fixed) {
    return (num: number): string => num.toFixed(dec);
  }

  const mul = pow(10, dec);
  return (num: number): number => Math.round(num * mul) / mul;

}
