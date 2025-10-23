import type { CreateFormatterOptions, CreateFormatterOptionsWithoutUnit, CreateFormatterOptionsWithUnit, DeclarativeFindUnit, DeprecatedFormatFindUnitFunction, DeprecatedFormatGetUnitFunction, DivisorFindItem, FormatFindUnitFunction, FormatFindUnitOption, FormatOutputAdvancedOption, FormatOutputFunction, FormatOutputOption, FormatRoundAdvancedOptions, FormatRoundOption, FormatterOptions, FormatterOptionsWithoutUnit, FormatterOptionsWithUnit, FormatUnitOption, MultiplierFindItem, RoundDecimals, RoundFunction } from '../../src'
import type { And, AssignableTo, Equals, EqualsOptional, Expect, KeysEquals } from './tools'

export type Results = And<[
  // Aliases
  Expect<Equals<CreateFormatterOptions, FormatterOptions>>,
  Expect<Equals<CreateFormatterOptionsWithUnit<string>, FormatterOptionsWithUnit<string>>>,
  Expect<Equals<CreateFormatterOptionsWithUnit<'U'>, FormatterOptionsWithUnit<'U'>>>,
  Expect<Equals<CreateFormatterOptionsWithoutUnit, FormatterOptionsWithoutUnit>>,

  // With/Without Unit
  Expect<Equals<FormatterOptions, object>>,
  Expect<KeysEquals<FormatterOptions, 'unit' | 'find' | 'round' | 'output'>>,

  // Formatter Options
  Expect<Equals<FormatterOptions['unit'], FormatUnitOption | DeprecatedFormatGetUnitFunction>>,
  Expect<EqualsOptional<FormatUnitOption, string | null>>,
  Expect<Equals<DeprecatedFormatGetUnitFunction, (value: number, rounded: string | number, pre: string) => string>>,

  Expect<Equals<FormatterOptions['find'], FormatFindUnitOption>>,
  Expect<EqualsOptional<FormatFindUnitOption, DeclarativeFindUnit | FormatFindUnitFunction | DeprecatedFormatFindUnitFunction | null>>,
  Expect<EqualsOptional<FormatFindUnitFunction, (value: number) => MultiplierFindItem | null | ReturnType<() => void>>>,
  Expect<Equals<DeprecatedFormatFindUnitFunction, (value: number) => DivisorFindItem>>,

  Expect<Equals<FormatterOptions['round'], FormatRoundOption>>,
  Expect<EqualsOptional<FormatRoundOption, RoundDecimals | RoundFunction | FormatRoundAdvancedOptions | boolean | null>>,
  Expect<Equals<RoundDecimals, number>>,
  Expect<Equals<RoundFunction, (num: number) => string | number>>,

  Expect<Equals<FormatterOptions['output'], FormatOutputOption>>,
  Expect<EqualsOptional<FormatOutputOption, FormatOutputFunction | FormatOutputAdvancedOption | null>>,
  Expect<Equals<FormatOutputFunction, (value: string | number, pre: string, unit: string) => string>>,

  Expect<AssignableTo<DivisorFindItem, object>>,
  Expect<KeysEquals<DivisorFindItem, 'div' | 'pre'>>,
  Expect<Equals<DivisorFindItem['pre'], string>>,
  Expect<Equals<DivisorFindItem['div'], number>>,

  Expect<Equals<FormatRoundAdvancedOptions, object>>,
  Expect<KeysEquals<FormatRoundAdvancedOptions, 'dec' | 'fixed'>>,
  Expect<EqualsOptional<FormatRoundAdvancedOptions['dec'], number | null>>,
  Expect<EqualsOptional<FormatRoundAdvancedOptions['fixed'], boolean | null>>,

  Expect<Equals<FormatOutputAdvancedOption, object>>,
  Expect<KeysEquals<FormatOutputAdvancedOption, 'space'>>,
  Expect<EqualsOptional<FormatOutputAdvancedOption['space'], string | number | null>>,

  // Formatter Options With Unit
  Expect<AssignableTo<'U', FormatterOptionsWithUnit<'U'>['unit']>>,
  Expect<AssignableTo<(value: string | number, pre: string, unit: 'U') => string, FormatterOptionsWithUnit<'U'>['output']>>,

  // Formatter Options Without Unit
  Expect<AssignableTo<(value: string | number, pre: string, unit: string) => string, FormatterOptionsWithoutUnit['output']>>,
]>
