import type { CreateParserOptions, CreateParserOptionsWithoutUnit, CreateParserOptionsWithUnit, DeclarativeFindUnit, InputMatchResults, MatchFunction, ParseFindMultiplierFunction, ParseFindMultiplierOption, ParseMatchOption, ParseMultiplier, ParserOptions, ParserOptionsWithoutUnit, ParserOptionsWithUnit, ParseUnitOption, RegExpPattern } from '../../src'
import type { And, AssignableTo, Equals, EqualsOptional, Expect, KeysEquals } from './tools'

export type Results = And<[
  // Aliases
  Expect<Equals<CreateParserOptions, ParserOptions>>,
  Expect<Equals<CreateParserOptionsWithUnit<string>, ParserOptionsWithUnit<string>>>,
  Expect<Equals<CreateParserOptionsWithUnit<'U'>, ParserOptionsWithUnit<'U'>>>,
  Expect<Equals<CreateParserOptionsWithoutUnit, ParserOptionsWithoutUnit>>,

  // With/Without Unit
  Expect<AssignableTo<ParserOptionsWithUnit<string>, ParserOptions>>,
  Expect<AssignableTo<ParserOptionsWithoutUnit, ParserOptions>>,

  // Parser Options
  Expect<Equals<ParserOptions, object>>,
  Expect<KeysEquals<ParserOptions, 'unit' | 'find' | 'match'>>,

  Expect<Equals<ParserOptions['unit'], ParseUnitOption>>,
  Expect<EqualsOptional<ParseUnitOption, string | null>>,

  Expect<Equals<ParserOptions['find'], ParseFindMultiplierOption>>,
  Expect<EqualsOptional<ParseFindMultiplierOption, DeclarativeFindUnit | ParseFindMultiplierFunction | null>>,
  Expect<Equals<ParseFindMultiplierFunction, (prefix: string, unit: string) => ParseMultiplier | null | undefined | ReturnType<() => void>>>,
  Expect<Equals<ParseMultiplier, number>>,

  Expect<Equals<ParserOptions['match'], ParseMatchOption>>,
  Expect<EqualsOptional<ParseMatchOption, RegExpPattern | MatchFunction | null>>,
  Expect<Equals<RegExpPattern, string | RegExp>>,
  Expect<Equals<MatchFunction, (input: string) => InputMatchResults | null | undefined | ReturnType<() => void>>>,
  Expect<Equals<InputMatchResults, [value: string, unit: string]>>,

  // Parser Options With Unit
  Expect<Equals<'U', ParserOptionsWithUnit<'U'>['unit']>>,
  Expect<AssignableTo<(prefix: string, unit: 'U') => ParseMultiplier | null | undefined | ReturnType<() => void>, ParserOptionsWithUnit<'U'>['find']>>,

  // Parser Options Without Unit
  Expect<AssignableTo<(prefix: string, unit: string) => ParseMultiplier | null | undefined | ReturnType<() => void>, ParserOptionsWithoutUnit['find']>>,
]>
