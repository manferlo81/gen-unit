import { error } from '../common/error';
import { isFiniteNumber, isNullish, isNumber } from '../common/is';
import { validateOptions } from '../common/validate-options';
import { removedParserOptions, validParserOptions } from './constants';
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

  // validate options
  const validOptions = validateOptions(
    options as CreateParserOptions,
    validParserOptions,
    removedParserOptions,
  );

  const { unit, match, find } = validOptions;

  const extractPre = createExtractPre(unit);
  const findMultiplier = createMulFinder(find);
  const matchInput = createMatcher(match);

  // return parser function
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

    // return NaN if input as string is empty ('')
    if (!inputAsString) return NaN;

    // convert string to number
    const inputAsNumber = +inputAsString;

    // return number if string as number is finite (not NaN or Infinity)
    if (isFiniteNumber(inputAsNumber)) return inputAsNumber;

    // capture value and unit from string
    const captured = matchInput(inputAsString);

    // return NaN if can't capture value and unit
    if (!captured) return NaN;

    // get captured array length
    const { length } = captured as string[];

    // throw if captured array has less that 2 items
    if (length < 2) throw error(`Match result array should have 2 items, got ${length}`);

    // get value and unit from captured array
    const [capturedValueAsString, wholeUnit] = captured;

    // return NaN if captured value is empty string ('')
    if (!capturedValueAsString) return NaN;

    // convert captured value to number
    const capturedValueAsNumber = +capturedValueAsString;

    // return NaN if captured value as number is not finite
    if (!isFiniteNumber(capturedValueAsNumber)) return NaN;

    // extract prefix from whole unit
    const pre = extractPre(wholeUnit);

    // try to find find multiplier
    const multiplier = findMultiplier(pre, unit);

    // return NaN if can't find multiplier
    if (isNullish(multiplier)) return NaN;

    // return parsed value
    return capturedValueAsNumber * multiplier;

  };

}
