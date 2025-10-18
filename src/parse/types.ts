import type { Nullish } from '../common/private-types'
import type { DeclarativeFindUnit } from '../common/types'

export type ParseUnitOption = Nullish<string>

export type InputMatchResults = [value: string, wholeUnit: string]

type MatchFunctionReturning<R> = (input: string) => R
export type MatchFunction = MatchFunctionReturning<Nullish<InputMatchResults>> | MatchFunctionReturning<void>
export type RegExpPattern = RegExp | string
export type ParseMatchOption = Nullish<RegExpPattern | MatchFunction>

export type ParseMultiplier = number

type ParseFindMultiplierFunctionReturning<U extends ParseUnitOption, R> = (prefix: string, unit: U) => R

type InternalParseFindMultiplierFunction<U extends ParseUnitOption> = ParseFindMultiplierFunctionReturning<U, Nullish<ParseMultiplier>>
export type ParseFindMultiplierFunction<U extends ParseUnitOption = ParseUnitOption> = InternalParseFindMultiplierFunction<U> | ParseFindMultiplierFunctionReturning<U, void>
export type ParseFindMultiplierOption<U extends ParseUnitOption = ParseUnitOption> = Nullish<DeclarativeFindUnit | ParseFindMultiplierFunction<U>>

interface CreateParserOptionsBase<U extends ParseUnitOption> {
  readonly find?: ParseFindMultiplierOption<U>
  readonly match?: ParseMatchOption
}

export interface CreateParserOptionsWithoutUnit extends CreateParserOptionsBase<undefined> {
  readonly unit?: Nullish
}

export interface CreateParserOptionsWithUnit<U extends ParseUnitOption> extends CreateParserOptionsBase<U> {
  readonly unit: U
}

export type CreateParserOptions = Partial<CreateParserOptionsWithUnit<ParseUnitOption>>

export type ParseInput = unknown
export type Parser = (input: ParseInput) => number
