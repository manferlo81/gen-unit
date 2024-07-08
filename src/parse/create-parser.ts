import { errorRemoved } from '../common/error';
import { isFinite, isNumber } from '../tools/is';
import { capture } from './capture';
import { createMulFinder } from './find-multiplier';
import type { CreateParserOptions, Parser, ParseInput } from './types';

export function createParser(options: CreateParserOptions = {}): Parser {

  if ('table' in options) {
    throw errorRemoved('table', 'find');
  }

  const {
    unit,
    find,
  } = options;

  const findMultiplier = createMulFinder(find);
  const extractPre = unit ? (
    (wholeUnit: string) => {
      if (wholeUnit.endsWith(unit)) {
        return wholeUnit.slice(0, -unit.length);
      }
      return wholeUnit;
    }
  ) : (
    (wholeUnit: string) => wholeUnit
  );

  return (input: ParseInput): number => {

    // if input is of type number (number, NaN or Infinity)
    if (isNumber(input)) {
      // return the number if it's finite (number), otherwise (NaN or Infinity) return NaN
      return isFinite(input) ? input : NaN;
    }

    // if input is falsy (false, "", null or undefined) return NaN
    if (!input) {
      return NaN;
    }

    // convert input (probably object) to string
    const inputAsString = `${input as never}`;

    // if string is empty ("") return NaN
    if (!inputAsString) {
      return NaN;
    }

    // convert string to number
    const inputAsNumber = +inputAsString;

    // return number if string as number is finite (not NaN or Infinity)
    if (isFinite(inputAsNumber)) {
      return inputAsNumber;
    }

    // capture value & unit from string
    const captureResult = capture(inputAsString);

    // if can't capture, return NaN
    if (!captureResult) {
      return NaN;
    }

    // get value & unit from captured
    const [valueAsStr, wholeUnit] = captureResult;
    // convert captured value to number
    const valueAsNum = +valueAsStr;

    // if value if 0 or NaN
    if (!valueAsNum) {
      // return 0 or NaN
      return valueAsNum;// === 0 ? 0 : NaN;
    }

    const pre = extractPre(wholeUnit);

    // find multiplier
    const multiplier = findMultiplier(pre, unit);

    // if can't find multiplier, return NaN
    if (!multiplier) {
      return NaN;
    }

    // return  multiplier
    return valueAsNum * multiplier;

  };

}
