import { error } from '../common/error';
import { isFunction } from '../tools/is-function';
import { isNumber } from '../tools/is-number';
import { pow } from '../tools/math';
import { isFinite, isNaN } from '../tools/number';
import type { RoundFunction, RoundOption } from './types';

export function createRounder(dec: number, fixed = false): RoundFunction {

  if (isNaN(dec) || !isFinite(dec) || dec < 0) {
    throw error(`can't create round function with ${dec} decimal.`);
  }

  if (fixed) {
    return (num: number): string => num.toFixed(dec);
  }

  const roundMultiplier = pow(10, dec);
  return (num: number): number => Math.round(num * roundMultiplier) / roundMultiplier;

}

export function createRounder_deprecated(round?: RoundOption, deprecatedDec?: number | string, deprecatedFixed?: boolean): RoundFunction {

  // return user option if it's a function
  if (isFunction(round)) {
    return round;
  }

  // create rounder with number of decimals provided if it's a number
  if (isNumber(round)) {
    return createRounder(round);
  }

  // use deprecated options if no "round" options provided
  if (!round) {
    return createRounder(
      deprecatedDec ? +deprecatedDec : 2,
      deprecatedFixed,
    );
  }

  // get data from advanced round object
  const { dec, fixed } = round;

  // return rounder with provided options
  return createRounder(
    dec ? +dec : 2,
    fixed,
  );

}
