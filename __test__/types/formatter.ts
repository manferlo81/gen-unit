import type { FormatInput, Formatter } from '../../src'
import type { And, Equals, Expect } from './tools'

export type Results = And<[
  Expect<Equals<Formatter, (value: FormatInput) => string>>,
  Expect<Equals<FormatInput, number>>,
]>
