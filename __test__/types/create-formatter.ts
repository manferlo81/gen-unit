import type { createFormatter, CreateFormatterOptions, CreateFormatterOptionsWithoutUnit, CreateFormatterOptionsWithUnit, Formatter } from '../../src'
import type { And, Equals, Expect } from './tools'

type CreateFormatterFunctionType = typeof createFormatter

export type Results = And<[
  Expect<Equals<CreateFormatterFunctionType, () => Formatter>>,
  Expect<Equals<CreateFormatterFunctionType, (options?: object) => Formatter>>,
  Expect<Equals<CreateFormatterFunctionType, (options?: CreateFormatterOptionsWithUnit<string> | CreateFormatterOptionsWithoutUnit) => Formatter>>,
  Expect<Equals<CreateFormatterFunctionType, (options?: CreateFormatterOptions) => Formatter>>,
]>
