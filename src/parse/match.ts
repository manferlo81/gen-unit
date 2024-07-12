import type { AllowNullish } from '../tools/helper-types';
import { isFunction } from '../tools/is';
import type { ParseMatchOption } from './types';

type InputCaptured = [value: string, wholeUnit: string];
type MatchFunction = (input: string) => InputCaptured | null;

function getRegExp(matchOption: AllowNullish<string | RegExp>) {
  if (matchOption == null) {
    return /^\s*(-?\d*\.?\d*(?:e[+-]?\d+)?)\s*([a-z\u00b5]*)\s*$/i;
  }
  return new RegExp(matchOption);
}

export function createMatcher(matchOption: ParseMatchOption): MatchFunction {

  if (isFunction(matchOption)) {
    // TODO: Wrap function to validate results
    return matchOption;
  }

  const reg = getRegExp(matchOption);

  return (input: string): InputCaptured | null => {

    // execute RegExp against input
    const result = reg.exec(input);

    // if it doesn't match, return null
    if (!result) {
      return null;
    }

    // return captured value & unit
    return result.slice(1, 3) as InputCaptured;
    // const [, value, wholeUnit] = result;
    // return [value, wholeUnit];

  };

}
