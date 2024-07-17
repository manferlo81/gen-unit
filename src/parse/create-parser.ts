import { error, errorOptionRemoved } from '../common/error';
import { isFiniteNumber, isNumber } from '../common/is';
import { createExtractPre } from './extract-pre';
import { createMulFinder } from './find-multiplier';
import { createMatcher } from './match';
import type { CreateParserOptions, CreateParserOptionsWithoutUnit, CreateParserOptionsWithUnit, ParseInput, Parser, ParseUnitOption } from './types';

/**
 * Create a parser function
 *
 * @param options create parser options
 */
export function createParser<U extends ParseUnitOption>(options: CreateParserOptionsWithUnit<U>): Parser;
export function createParser(options: CreateParserOptionsWithoutUnit): Parser;
export function createParser(options?: CreateParserOptionsWithUnit<ParseUnitOption> | CreateParserOptionsWithoutUnit): Parser;
export function createParser(options: CreateParserOptionsWithUnit<ParseUnitOption> | CreateParserOptionsWithoutUnit = {}): Parser {

  // TODO: remove in the future
  // option removed in version 0.1.0
  // throw if removed table option present
  if ('table' in options) throw errorOptionRemoved('table', 'find');

  const {
    unit,
    match,
    find,
  } = options as CreateParserOptions;

  const extractPre = createExtractPre(unit);
  const findMultiplier = createMulFinder(find);
  const matchInput = createMatcher(match);

  return (input: ParseInput): number => {

    // if input is of type number (number, NaN or Infinity)
    if (isNumber(input)) {

      // return the number if it's finite (number)
      if (isFiniteNumber(input)) return input;

      // return NaN otherwise (NaN or Infinity)
      return NaN;

    }

    // return NaN if input is falsy (false, '', null or undefined) or true
    if (!input || input === true) return NaN;

    // convert input (probably non-empty string or object) to string
    const inputAsString = `${input as never}`;

    // return NaN if value is empty string ('')
    if (!inputAsString) return NaN;

    // convert string to number
    const inputAsNumber = +inputAsString;

    // return number if string as number is finite (not NaN or Infinity)
    if (isFiniteNumber(inputAsNumber)) return inputAsNumber;

    // capture value & unit from string
    const captured = matchInput(inputAsString);

    // return NaN if can't capture value & unit
    if (!captured) return NaN;

    // get captured array length
    const { length } = captured as string[];

    // throw if captured array has less that 2 items
    if (length < 2) throw error(`Match result array should have 2 items, got ${length}`);

    // get value & unit from captured
    const [capturedValueAsString, wholeUnit] = captured;

    // return NaN if captured value is empty string ('')
    if (!capturedValueAsString) return NaN;

    // convert captured value to number
    const capturedValueAsNumber = +capturedValueAsString;

    // return NaN if value is not finite
    if (!isFiniteNumber(capturedValueAsNumber)) return NaN;

    // extract prefix from whole unit
    const pre = extractPre(wholeUnit);

    // try to find find multiplier
    const multiplier = findMultiplier(pre, unit);

    // return NaN if can't find multiplier
    if (!multiplier) return NaN;

    // return value * multiplier
    return capturedValueAsNumber * multiplier;

  };

}
