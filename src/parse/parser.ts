import { isNumber } from '../tools/is-number';
import { isFinite, isNaN } from '../tools/number';
import { capture } from './capture';
import { createMulFinder } from './find-multiplier';
import { type CreateParserOptions, type ParseFunction, type ParseInput } from './types';

export function createParser(options: CreateParserOptions = {}): ParseFunction {

  const {
    unit,
    find,
    table: deprecatedTable,
  } = options;

  const findMultiplier = createMulFinder(unit, find, deprecatedTable);

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

    // convert input (probably array or object) to string
    const asString = `${input as never}`;

    // if string is empty ("") return NaN
    if (!asString) {
      return NaN;
    }

    // convert string to number
    const asNum = +asString;

    // if number is not NaN & it's finite (not Infinity) return it, otherwise return NaN
    if (!isNaN(asNum)) {
      return isFinite(asNum) ? asNum : NaN;
    }

    // capture value & unit from string
    const captureResult = capture(asString);

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

    // find multiplier
    const multiplier = findMultiplier(wholeUnit);

    // if can't find multiplier, return NaN
    if (!multiplier) {
      return NaN;
    }

    // return  multiplier
    return valueAsNum * multiplier;

  };

}
