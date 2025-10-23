import type { FormatterOptions } from './types'

type ValidFormatterOptionName = keyof FormatterOptions
type RemovedFormatterOptionName = 'table' | 'dec' | 'fixed'

export const VALID_FORMATTER_OPTIONS: ValidFormatterOptionName[] = ['unit', 'find', 'round', 'output']

export const REMOVED_FORMATTER_OPTIONS: Record<RemovedFormatterOptionName, ValidFormatterOptionName> = {
  table: 'find',
  dec: 'round',
  fixed: 'round',
}
