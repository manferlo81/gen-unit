import { errorOptionRemoved } from '../common/error';
import { isFiniteNumber, isNumber } from '../tools/is';
import { capture } from './capture';
import { createMulFinder } from './find-multiplier';
import type { CreateParserOptions, Parser, ParseInput } from './types';

export function createParser(options: CreateParserOptions = {}): Parser {

  if ('table' in options) {
    throw errorOptionRemoved('table', 'find');
  }

  const {
    unit,
    find,
  } = options;

  const extractPre: (wholeUnit: string) => string = unit ? (
    (wholeUnit) => {
      if (wholeUnit.endsWith(unit)) {
        const unitLength = unit.length;
        return wholeUnit.slice(0, -unitLength);
      }
      return wholeUnit;
    }
  ) : (
    (wholeUnit) => wholeUnit
  );
  const findMultiplier = createMulFinder(find);

  return (input: ParseInput): number => {

    // if input is of type number (number, NaN or Infinity)
    if (isNumber(input)) {
      // return the number if it's finite (number), otherwise (NaN or Infinity) return NaN
      return isFiniteNumber(input) ? input : NaN;
    }

    // if input is falsy (false, "", null or undefined) return NaN
    if (!input) {
      return NaN;
    }

    // convert input (probably non-empty string or object) to string
    const inputAsString = `${input as never}`;

    // if string is empty ("") return NaN
    if (!inputAsString) {
      return NaN;
    }

    // convert string to number
    const inputAsNumber = +inputAsString;

    // return number if string as number is finite (not NaN or Infinity)
    if (isFiniteNumber(inputAsNumber)) {
      return inputAsNumber;
    }

    // capture value & unit from string
    const captureResult = capture(inputAsString);

    // if can't capture, return NaN
    if (!captureResult) {
      return NaN;
    }

    // get value & unit from captured
    const [capturedValueAsString, wholeUnit] = captureResult;

    // convert captured value to number
    const capturedValueAsNumber = +capturedValueAsString;

    // return if value if it's 0 or NaN
    if (!capturedValueAsNumber) {
      return capturedValueAsNumber;
    }

    // TODO: It's not necessary to check if captured value is finite
    // because capture RegExp won't return any Infinite value
    // if (!isFinite(capturedValueAsNumber)) {
    //   return NaN;
    // }

    const pre = extractPre(wholeUnit);

    // find multiplier
    const multiplier = findMultiplier(pre, unit);

    // if can't find multiplier, return NaN
    if (!multiplier) {
      return NaN;
    }

    // return value * multiplier
    return capturedValueAsNumber * multiplier;

  };

}
