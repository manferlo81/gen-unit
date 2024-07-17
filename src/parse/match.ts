import { error } from '../common/error';
import { isArray, isFunction, isNullish } from '../common/is';
import type { InputMatchResults, MatchFunction, ParseMatchOption } from './types';

export function createMatcher(match: ParseMatchOption): MatchFunction {

  // return wrapped function if match option is a function
  // wrap function to test for invalid result
  if (isFunction(match)) return (input) => {

    // call user function
    const captured = match(input);

    // return undefined if nullish return by user function
    if (isNullish(captured)) {
      return;
    }

    // throw if it's not an array
    if (!isArray(captured)) {
      throw error('Match function should return an array of strings');
    }

    // return array
    // array validation will happen later
    return captured;

  };

  // create regular expression based on option
  const re = isNullish(match)
    ? /^\s*(-?\d*\.?\d*(?:e[+-]?\d+)?)\s*([a-z\xb5]*)\s*$/i
    : new RegExp(match);

  return (input) => {

    // execute RegExp against input
    const result = re.exec(input);

    // return undefined if it doesn't match
    if (!result) return;

    // get a slice of the result array containing the captured groups only
    const resultAsArray = result.slice(1);

    // return array
    // array validation will happen later
    return resultAsArray as InputMatchResults;

  };

}
