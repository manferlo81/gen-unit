import { errorOptionRemoved } from '../common/error';
import { isFiniteNumber, isNumber } from '../tools/is';
import { createExtractPre } from './extract-pre';
import { createMulFinder } from './find-multiplier';
import { createMatcher } from './match';
import type { CreateParserOptions, CreateParserOptionsWithUnit, ParseInput, Parser, ParseUnitOption } from './types';

/**
 * Create a new parser
 * @param options parser options
 * @returns the parser
 */
export function createParser<U extends ParseUnitOption>(options: CreateParserOptionsWithUnit<U>): Parser;
export function createParser(options?: CreateParserOptions): Parser;
export function createParser(options: CreateParserOptions = {}): Parser {

  if ('table' in options) {
    throw errorOptionRemoved('table', 'find');
  }

  const {
    unit,
    match: matchOption,
    find,
  } = options;

  const extractPre = createExtractPre(unit);
  const findMultiplier = createMulFinder(find);
  const match = createMatcher(matchOption);

  return (input: ParseInput): number => {

    // if input is of type number (number, NaN or Infinity)
    if (isNumber(input)) {
      // return the number if it's finite (number), otherwise (NaN or Infinity) return NaN
      return isFiniteNumber(input) ? input : NaN;
    }

    // return NaN if input is falsy (false, '', null or undefined) or true
    if (!input || input === true) {
      return NaN;
    }

    // convert input (probably non-empty string or object) to string
    const inputAsString = `${input as never}`;

    // return NaN if value is empty string ('')
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
    const captured = match(inputAsString);

    // return NaN if can't capture value & unit
    if (!captured) {
      return NaN;
    }

    // get value & unit from captured
    const [capturedValueAsString, wholeUnit] = captured;

    // return NaN if captured value is empty string ('')
    if (!capturedValueAsString) {
      return NaN;
    }

    // convert captured value to number
    const capturedValueAsNumber = +capturedValueAsString;

    // return NaN if value is not finite
    if (!isFiniteNumber(capturedValueAsNumber)) {
      return NaN;
    }

    const pre = extractPre(wholeUnit);

    // try to find find multiplier
    const multiplier = findMultiplier(pre, unit);

    // return NaN if can't find multiplier
    if (!multiplier) {
      return NaN;
    }

    // return value * multiplier
    return capturedValueAsNumber * multiplier;

  };

}
