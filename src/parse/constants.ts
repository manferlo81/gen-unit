import type { ParserOptions } from './types'

type ValidParserOptionName = keyof ParserOptions
type RemovedParserOptionName = 'table'

export const VALID_PARSER_OPTIONS: ValidParserOptionName[] = ['unit', 'match', 'find']

export const REMOVED_PARSER_OPTIONS: Record<RemovedParserOptionName, ValidParserOptionName> = {
  table: 'find',
}

export const DEFAULT_MATCH_PATTERN = /^\s*(-?\d*\.?\d*(?:e[+-]?\d+)?)\s*([a-z\xb5]*)\s*$/i
