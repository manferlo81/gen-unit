import { errorInvalidOption, rangeError } from '../common/error';
import type { AllowNullish } from '../common/helper-types';
import { isFiniteNumber, isFunction, isNullish, isNumber, isObject } from '../common/is';
import type { FormatRoundOption, RoundFunction } from './types';

function validateNumberOfDecimals(dec: number): number {
  if (!isFiniteNumber(dec) || dec < 0) {
    throw rangeError(`Can't create round function with ${dec} decimal.`);
  }
  return dec;
}

export function createRounderWith(dec: number, fixed?: AllowNullish<boolean>): RoundFunction {

  if (fixed) {
    return (num: number): string => {
      return num.toFixed(dec);
    };
  }

  const roundMultiplier = 10 ** dec;

  return (num: number): number => {
    return Math.round(num * roundMultiplier) / roundMultiplier;
  };

}

export function createRounder(round: FormatRoundOption): RoundFunction {

  // return default rounder if no "round" option
  if (isNullish(round)) {
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

  if (isNullish(dec)) {
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
