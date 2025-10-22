import type { CreateParserOptions, DeclarativeFindUnit, InputMatchResults, MatchFunction, ParseFindMultiplierFunction, ParseFindMultiplierOption, ParseMatchOption, ParseMultiplier, ParseUnitOption, RegExpPattern } from '../../src'
import type { And, Equals, EqualsOptional, Expect, KeysEquals } from './tools'

export type Results = And<[
  Expect<Equals<CreateParserOptions, object>>,
  Expect<KeysEquals<CreateParserOptions, 'unit' | 'find' | 'match'>>,

  Expect<Equals<CreateParserOptions['unit'], ParseUnitOption>>,
  Expect<EqualsOptional<ParseUnitOption, string | null>>,

  Expect<Equals<CreateParserOptions['find'], ParseFindMultiplierOption>>,
  Expect<EqualsOptional<ParseFindMultiplierOption, DeclarativeFindUnit | ParseFindMultiplierFunction | null>>,
  Expect<Equals<ParseFindMultiplierFunction, (prefix: string, unit: ParseUnitOption) => ParseMultiplier | null | undefined | ReturnType<() => void>>>,
  Expect<Equals<ParseMultiplier, number>>,

  Expect<Equals<CreateParserOptions['match'], ParseMatchOption>>,
  Expect<EqualsOptional<ParseMatchOption, RegExpPattern | MatchFunction | null>>,
  Expect<Equals<RegExpPattern, string | RegExp>>,
  Expect<Equals<MatchFunction, (input: string) => InputMatchResults | null | undefined | ReturnType<() => void>>>,
  Expect<Equals<InputMatchResults, [value: string, unit: string]>>,
]>
