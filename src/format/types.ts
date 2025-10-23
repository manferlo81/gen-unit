import type { Nullish } from '../common/private-types'
import type { DeclarativeFindUnit, MultiplierFindItem } from '../common/types'
import type { DeprecatedFormatFindUnitFunction, DeprecatedFormatGetUnitFunction } from '../deprecated-types'

export type FormatUnitOption = Nullish<string>

type FormatFindUnitFunctionReturning<R> = (value: number) => R
export type FormatFindUnitFunction = FormatFindUnitFunctionReturning<Nullish<MultiplierFindItem>> | FormatFindUnitFunctionReturning<void>
export type FormatFindUnitOption = Nullish<DeclarativeFindUnit | FormatFindUnitFunction> | DeprecatedFormatFindUnitFunction

export type RoundDecimals = number

export type RoundFunction = (num: number) => string | number
export interface FormatRoundAdvancedOptions {
  readonly dec?: Nullish<RoundDecimals>
  readonly fixed?: Nullish<boolean>
}
export type FormatRoundOption = Nullish<RoundDecimals | FormatRoundAdvancedOptions | RoundFunction | boolean>

export type FormatOutputFunction<U extends string = string> = (value: string | number, pre: string, unit: U) => string
export interface FormatOutputAdvancedOption {
  readonly space?: Nullish<string | number>
}
export type FormatOutputOption<U extends string = string> = Nullish<FormatOutputFunction<U> | FormatOutputAdvancedOption>

export interface FormatterOptions<U extends FormatUnitOption = FormatUnitOption> {
  readonly unit?: U | DeprecatedFormatGetUnitFunction<U extends string ? U : string>
  readonly find?: FormatFindUnitOption
  readonly round?: FormatRoundOption
  readonly output?: FormatOutputOption<U extends string ? U : string>
}

export interface FormatterOptionsWithUnit<U extends string> extends Omit<FormatterOptions<U>, 'unit'> {
  readonly unit: U | DeprecatedFormatGetUnitFunction<U>
}

export interface FormatterOptionsWithoutUnit extends Omit<FormatterOptions<string>, 'unit'> {
  readonly unit?: Nullish
}

export type FormatInput = number
export type Formatter = (value: FormatInput) => string
