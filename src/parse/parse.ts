import { createParser } from './create-parser';
import type { CreateParserOptions, CreateParserOptionsWithUnit, ParseInput, ParseUnitOption } from './types';

/**
 * Parse value in one step
 *
 * @param input input to parse
 * @param options parser options
 * @returns parsed value or NaN if it can't be parsed
 */
export function parse<U extends ParseUnitOption>(input: ParseInput, options: CreateParserOptionsWithUnit<U>): number;
export function parse(input: ParseInput, options?: CreateParserOptions): number;
export function parse(input: ParseInput, options?: CreateParserOptions): number {
  return createParser(options)(input);
}
