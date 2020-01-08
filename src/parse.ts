import { createParser } from './create-parser'
import { CreateParserOptions } from './parser-types'

function parse(input: string | number | object, options?: CreateParserOptions): number {
  const parse = createParser(options)
  return parse(input)
}

export default parse
