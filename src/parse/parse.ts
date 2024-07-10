import { createParser } from './create-parser';
import type { CreateParserOptions, CreateParserOptionsWithUnit, ParseInput, ParseUnitOption } from './types';

export function parse<U extends ParseUnitOption>(input: ParseInput, options: CreateParserOptionsWithUnit<U>): number;
export function parse(input: ParseInput, options?: CreateParserOptions): number;
export function parse(input: ParseInput, options?: CreateParserOptions): number {
  return createParser(options)(input);
}
