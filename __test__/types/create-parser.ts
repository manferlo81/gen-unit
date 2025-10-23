import type { createParser, CreateParserOptions, CreateParserOptionsWithoutUnit, CreateParserOptionsWithUnit, Parser } from '../../src'
import type { And, Equals, Expect } from './tools'

type CreateParserFunctionType = typeof createParser

export type Results = And<[
  Expect<Equals<CreateParserFunctionType, () => Parser>>,
  Expect<Equals<CreateParserFunctionType, (options?: object) => Parser>>,
  Expect<Equals<CreateParserFunctionType, (options?: CreateParserOptionsWithUnit<string> | CreateParserOptionsWithoutUnit) => Parser>>,
  Expect<Equals<CreateParserFunctionType, (options?: CreateParserOptions) => Parser>>,
]>
