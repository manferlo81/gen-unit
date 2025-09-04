import type { AllowNullish, AllowNullishReturn, WithOptionalFind, WithUnit } from '../common/private-types'
import { Nullish } from '../common/private-types'
import type { DeclarativeFindUnit, MultiplierFindItem } from '../common/types'
import type { DeprecatedFormatFindUnitFunction, DeprecatedFormatGetUnitFunction } from '../deprecated-types'

export type FormatUnitOption = AllowNullish<string>

export type FormatFindUnitFunction = (value: number) => AllowNullishReturn<MultiplierFindItem>
// eslint-disable-next-line @typescript-eslint/no-deprecated
export type FormatFindUnitOption = AllowNullish<DeclarativeFindUnit | FormatFindUnitFunction> | DeprecatedFormatFindUnitFunction

export type RoundDecimals = number

export type RoundFunction = (num: number) => string | number
export interface FormatRoundAdvancedOptions {
  readonly dec?: AllowNullish<RoundDecimals>
  readonly fixed?: AllowNullish<boolean>
}
export type FormatRoundOption = AllowNullish<RoundDecimals | FormatRoundAdvancedOptions | RoundFunction | boolean>

export type FormatOutputFunction<U extends string = string> = (value: string | number, pre: string, unit: U) => string
export interface FormatOutputAdvancedOption {
  readonly space?: AllowNullish<string | number>
}
export type FormatOutputOption<U extends string = string> = AllowNullish<FormatOutputFunction<U> | FormatOutputAdvancedOption>

interface CreateFormatterOptionsBase<U extends string> extends WithOptionalFind<FormatFindUnitOption> {
  readonly round?: FormatRoundOption
  readonly output?: FormatOutputOption<U>
}

export interface CreateFormatterOptionsWithoutUnit extends Partial<WithUnit<Nullish>>, CreateFormatterOptionsBase<string> {}

// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface CreateFormatterOptionsWithUnit<U extends FormatUnitOption> extends WithUnit<U | DeprecatedFormatGetUnitFunction<U extends string ? U : string>>, CreateFormatterOptionsBase<U extends string ? U : string> {}

export type CreateFormatterOptions = Partial<CreateFormatterOptionsWithUnit<FormatUnitOption>>

export type FormatInput = number
export type Formatter = (value: FormatInput) => string
