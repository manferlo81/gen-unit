import { createParser } from './create-parser'
import { CreateParserOptions, ParseInput } from './parser-types'

export function parse(input: ParseInput, options?: CreateParserOptions): number {
  return createParser(options)(input)
}
