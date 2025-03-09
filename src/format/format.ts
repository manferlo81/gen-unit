import { createFormatter } from './create-formatter'
import type { CreateFormatterOptions, CreateFormatterOptionsWithoutUnit, CreateFormatterOptionsWithUnit, FormatUnitOption } from './types'

export function format<U extends FormatUnitOption>(value: number, options?: CreateFormatterOptionsWithUnit<U>): string
export function format(value: number, options: CreateFormatterOptionsWithoutUnit): string
export function format(value: number, options?: CreateFormatterOptions): string
export function format(value: number, options?: CreateFormatterOptions): string {
  const formatter = createFormatter(options)
  return formatter(value)
}
