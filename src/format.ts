import { createFormatter } from './create-formatter'
import { CreateFormatterOptions } from './formatter-types'

export function format(value: number, options?: CreateFormatterOptions): string {
  return createFormatter(options)(value)
}
