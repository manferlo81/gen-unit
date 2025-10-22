import type { ParseInput, Parser } from '../../src'
import type { And, Equals, Expect } from './tools'

export type Results = And<[
  Expect<Equals<Parser, (input: ParseInput) => number>>,
  Expect<Equals<ParseInput, unknown>>,
]>
