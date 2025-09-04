import type { AllowNullish, AllowNullishReturn, Nullish, WithOptionalFind, WithUnit } from '../common/private-types'
import type { DeclarativeFindUnit } from '../common/types'

export type ParseUnitOption = AllowNullish<string>

export type InputMatchResults = [value: string, wholeUnit: string]
export type MatchFunction = (input: string) => AllowNullishReturn<InputMatchResults>
export type RegExpPattern = RegExp | string
export type ParseMatchOption = AllowNullish<RegExpPattern | MatchFunction>

export type ParseMultiplier = number
export type ParseFindMultiplierFunction<U extends ParseUnitOption = ParseUnitOption> = (prefix: string, unit: U) => AllowNullishReturn<ParseMultiplier>
export type ParseFindMultiplierOption<U extends ParseUnitOption = ParseUnitOption> = AllowNullish<DeclarativeFindUnit | ParseFindMultiplierFunction<U>>

interface CreateParserOptionsBase<U extends ParseUnitOption> extends WithOptionalFind<ParseFindMultiplierOption<U>> {
  readonly match?: ParseMatchOption
}

export interface CreateParserOptionsWithoutUnit extends Partial<WithUnit<Nullish>>, CreateParserOptionsBase<undefined> {}

export interface CreateParserOptionsWithUnit<U extends ParseUnitOption> extends WithUnit<U>, CreateParserOptionsBase<U> {}

export type CreateParserOptions = Partial<CreateParserOptionsWithUnit<ParseUnitOption>>

export type ParseInput = unknown
export type Parser = (input: ParseInput) => number
