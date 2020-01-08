import { createFormatter } from './create-formatter'
import { CreateFormatterOptions } from './formatter-types'

function format(value: number, options?: CreateFormatterOptions): string {
  return createFormatter(options)(value)
}

export default format
