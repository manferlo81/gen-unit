import { createFormatter } from './create-formatter'
import type { FormatterOptions, FormatterOptionsWithoutUnit, FormatterOptionsWithUnit } from './types'

export function format(value: number, options: FormatterOptionsWithoutUnit): string
export function format<U extends string>(value: number, options?: FormatterOptionsWithUnit<U>): string
export function format(value: number, options?: FormatterOptions): string
export function format(value: number, options?: FormatterOptions): string {
  const formatter = createFormatter(options)
  return formatter(value)
}
