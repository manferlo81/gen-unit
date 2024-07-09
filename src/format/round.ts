import { error, errorInvalidOption } from '../common/error';
import { AllowNullish } from '../tools/helper-types';
import { isFiniteNumber, isFunction, isNumber, isObject } from '../tools/is';
import { pow } from '../tools/math';
import type { FormatRoundOption, RoundFunction } from './types';

export function createRounderWith(dec: number, fixed?: AllowNullish<boolean>): RoundFunction {

  if (!isFiniteNumber(dec) || dec < 0) {
    throw error(`Can't create round function with ${dec} decimal.`);
  }

  if (fixed) {
    return (num: number): string => num.toFixed(dec);
  }

  const roundMultiplier = pow(10, dec);
  return (num: number): number => Math.round(num * roundMultiplier) / roundMultiplier;

}

export function createRounder(round: FormatRoundOption): RoundFunction {

  // return default rounder if no "round" option
  if (round == null) {
    return createRounderWith(2);
  }

  // return user option if it's a function
  if (isFunction(round)) {
    return round;
  }

  // create rounder with number of decimals provided if it's a number
  if (isNumber(round)) {
    return createRounderWith(round);
  }

  if (!isObject(round)) {
    throw errorInvalidOption('round');
  }

  // get data from advanced round object
  const { dec, fixed } = round;

  // return rounder with provided options
  return createRounderWith(
    dec ? +dec : 2,
    fixed,
  );

}
