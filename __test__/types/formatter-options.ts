import type { CreateFormatterOptions, DeclarativeFindUnit, DeprecatedFormatFindUnitFunction, DeprecatedFormatGetUnitFunction, DivisorFindItem, FormatFindUnitFunction, FormatFindUnitOption, FormatOutputAdvancedOption, FormatOutputFunction, FormatOutputOption, FormatRoundAdvancedOptions, FormatRoundOption, FormatUnitOption, MultiplierFindItem, RoundDecimals, RoundFunction } from '../../src'
import type { And, AssignableTo, Equals, EqualsOptional, Expect, KeysEquals } from './tools'

export type Results = And<[
  Expect<Equals<CreateFormatterOptions, object>>,
  Expect<KeysEquals<CreateFormatterOptions, 'unit' | 'find' | 'round' | 'output'>>,

  Expect<Equals<CreateFormatterOptions['unit'], FormatUnitOption | DeprecatedFormatGetUnitFunction>>,
  Expect<EqualsOptional<FormatUnitOption, string | null>>,
  Expect<Equals<DeprecatedFormatGetUnitFunction, (value: number, rounded: string | number, pre: string) => string>>,

  Expect<Equals<CreateFormatterOptions['find'], FormatFindUnitOption>>,
  Expect<EqualsOptional<FormatFindUnitOption, DeclarativeFindUnit | FormatFindUnitFunction | DeprecatedFormatFindUnitFunction | null>>,
  Expect<EqualsOptional<FormatFindUnitFunction, (value: number) => MultiplierFindItem | null | ReturnType<() => void>>>,
  Expect<Equals<DeprecatedFormatFindUnitFunction, (value: number) => DivisorFindItem>>,

  Expect<Equals<CreateFormatterOptions['round'], FormatRoundOption>>,
  Expect<EqualsOptional<FormatRoundOption, RoundDecimals | RoundFunction | FormatRoundAdvancedOptions | boolean | null>>,
  Expect<Equals<RoundDecimals, number>>,
  Expect<Equals<RoundFunction, (num: number) => string | number>>,

  Expect<Equals<CreateFormatterOptions['output'], FormatOutputOption>>,
  Expect<EqualsOptional<FormatOutputOption, FormatOutputFunction | FormatOutputAdvancedOption | null>>,
  Expect<Equals<FormatOutputFunction, (value: string | number, pre: string, unit: string) => string>>,

  Expect<AssignableTo<MultiplierFindItem, object>>,
  Expect<KeysEquals<MultiplierFindItem, 'mul' | 'pre'>>,
  Expect<Equals<MultiplierFindItem['pre'], string>>,
  Expect<Equals<MultiplierFindItem['mul'], number>>,

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
]>
