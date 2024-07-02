import { error } from '../common/error';
import { pow } from '../tools/math';
import { isFinite, isNaN } from '../tools/number';
import { RoundAdvancedOptions, RoundFunction } from './types';

export function createRounder(options: RoundAdvancedOptions): RoundFunction {

  const { dec: decOp, fixed } = options;
  const dec = decOp != null ? +decOp : 2;

  if (isNaN(dec) || !isFinite(dec) || dec < 0) {
    throw error('invalid "dec" option.');
  }

  if (fixed) {
    return (num: number): string => num.toFixed(dec);
  }

  const mul = pow(10, dec);
  return (num: number): number => Math.round(num * mul) / mul;

}
