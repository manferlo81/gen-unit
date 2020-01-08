import { createFormatter } from './create-formatter'
import { CreateFormatterOptions } from './formatter-types'

function format(value: number, options?: CreateFormatterOptions): string {
  const format = createFormatter(options)
  return format(value)
}

export default format
