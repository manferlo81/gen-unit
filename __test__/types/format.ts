import type { CreateFormatterOptions, CreateFormatterOptionsWithoutUnit, CreateFormatterOptionsWithUnit, format } from '../../src'
import type { And, Equals, Expect } from './tools'

type FormatFunctionType = typeof format

export type Results = And<[
  Expect<Equals<FormatFunctionType, (input: number) => string>>,
  Expect<Equals<FormatFunctionType, (input: number, options?: object) => string>>,
  Expect<Equals<FormatFunctionType, (input: number, options?: CreateFormatterOptionsWithUnit<string> | CreateFormatterOptionsWithoutUnit) => string>>,
  Expect<Equals<FormatFunctionType, (input: number, options?: CreateFormatterOptions) => string>>,
]>
