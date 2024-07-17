import { error } from '../common/error';
import { isArray, isFunction, isNullish } from '../common/is';
import type { InputMatchResults, MatchFunction, ParseMatchOption } from './types';

export function createMatcher(match: ParseMatchOption): MatchFunction {

  if (isFunction(match)) {

    return (input) => {

      const captured = match(input);

      // return undefined if nullish return by function
      if (isNullish(captured)) {
        return;
      }

      // throw if it's not an array
      if (!isArray(captured)) {
        throw error('Match function should return an array of strings');
      }

      // return array
      return captured;

    };

  }

  const reg = isNullish(match)
    ? /^\s*(-?\d*\.?\d*(?:e[+-]?\d+)?)\s*([a-z\xb5]*)\s*$/i
    : new RegExp(match);

  return (input) => {

    // execute RegExp against input
    const result = reg.exec(input);

    // return undefined if it doesn't match
    if (!result) {
      return;
    }

    // get a slice of the result array
    const resultAsArray = result.slice(1, 3) as InputMatchResults;

    // return array
    return resultAsArray;

  };

}
