import { error, errorInvalidOption } from '../common/error';
import type { AllowNullish } from '../tools/helper-types';
import { isFiniteNumber, isFunction, isNumber, isObject } from '../tools/is';
import { pow } from '../tools/math';
import type { FormatRoundOption, RoundFunction } from './types';

function validateNumberOfDecimals(dec: number): number {
  if (!isFiniteNumber(dec) || dec < 0) {
    throw error(`Can't create round function with ${dec} decimal.`);
  }
  return dec;
}

export function createRounderWith(dec: number, fixed?: AllowNullish<boolean>): RoundFunction {

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
    return createRounderWith(
      validateNumberOfDecimals(round),
    );
  }

  if (!isObject(round)) {
    throw errorInvalidOption('round');
  }

  // get data from advanced round object
  const { dec, fixed } = round;

  if (dec == null) {
    return createRounderWith(
      2,
      fixed,
    );
  }

  if (!isNumber(dec)) {
    // TODO: throw more descriptive error
    throw errorInvalidOption('round');
  }

  // return rounder with provided options
  return createRounderWith(
    validateNumberOfDecimals(dec),
    fixed,
  );

}
