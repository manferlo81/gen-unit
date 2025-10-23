import { createParser } from './create-parser'
import type { ParseInput, ParserOptions, ParserOptionsWithoutUnit, ParserOptionsWithUnit } from './types'

/**
 * Parse value in one step
 *
 * @param input input to parse
 * @param options parser options
 * @returns parsed value or NaN if it can't be parsed
 */
export function parse(input: ParseInput, options: ParserOptionsWithoutUnit): number
export function parse<U extends string>(input: ParseInput, options: ParserOptionsWithUnit<U>): number
export function parse(input: ParseInput, options?: ParserOptions): number
export function parse(input: ParseInput, options?: ParserOptions): number {
  const parser = createParser(options)
  return parser(input)
}
