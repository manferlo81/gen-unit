import { type CreateParserOptions, type ParseInput } from './types';
import { createParser } from './parser';

export function parse(input: ParseInput, options?: CreateParserOptions): number {
  return createParser(options)(input);
}
