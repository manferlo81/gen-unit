import { createParser } from './create-parser';
import type { CreateParserOptions, ParseInput } from './types';

export function parse(input: ParseInput, options?: CreateParserOptions): number {
  return createParser(options)(input);
}
