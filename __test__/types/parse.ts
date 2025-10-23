import type { CreateParserOptions, CreateParserOptionsWithoutUnit, CreateParserOptionsWithUnit, parse } from '../../src'
import type { And, Equals, Expect } from './tools'

type ParseFunctionType = typeof parse

export type Results = And<[
  Expect<Equals<ParseFunctionType, (input: unknown) => number>>,
  Expect<Equals<ParseFunctionType, (input: unknown, options?: object) => number>>,
  Expect<Equals<ParseFunctionType, (input: unknown, options?: CreateParserOptionsWithUnit<string> | CreateParserOptionsWithoutUnit) => number>>,
  Expect<Equals<ParseFunctionType, (input: unknown, options?: CreateParserOptions) => number>>,
]>
