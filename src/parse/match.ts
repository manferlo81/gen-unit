import { error } from '../common/error';
import { isArray, isFunction } from '../tools/is';
import type { InputMatchResults, MatchFunction, ParseMatchOption } from './types';

export function createMatcher(matchOption: ParseMatchOption): MatchFunction {

  if (isFunction(matchOption)) {

    return (input) => {

      const captured = matchOption(input);

      if (captured == null) {
        return null;
      }

      // throw if it's not an array
      if (!isArray<string[]>(captured)) {
        throw error('match function should return an array of strings');
      }

      // return array
      return captured;

    };

  }

  const reg = matchOption == null
    ? /^\s*(-?\d*\.?\d*(?:e[+-]?\d+)?)\s*([a-z\u00b5]*)\s*$/i
    : new RegExp(matchOption);

  return (input) => {

    // execute RegExp against input
    const result = reg.exec(input);

    // if it doesn't match, return null
    if (!result) {
      return null;
    }

    // get a slice of the result array
    const resultAsArray = result.slice(1, 3);

    // return array
    return resultAsArray as InputMatchResults;

  };

}
