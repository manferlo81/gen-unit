import type { Nullish } from '../common/private-types'
import type { DeclarativeFindUnit } from '../common/types'

export type ParseUnitOption = Nullish<string>

export type InputMatchResults = [value: string, wholeUnit: string]

type MatchFunctionReturning<R> = (input: string) => R
export type MatchFunction = MatchFunctionReturning<Nullish<InputMatchResults>> | MatchFunctionReturning<void>
export type RegExpPattern = RegExp | string
export type ParseMatchOption = Nullish<RegExpPattern | MatchFunction>

export type ParseMultiplier = number

type ParseFindMultiplierFunctionReturning<U extends string, R> = (prefix: string, unit: U) => R
export type ParseFindMultiplierFunction<U extends string = string> = ParseFindMultiplierFunctionReturning<U, Nullish<ParseMultiplier>> | ParseFindMultiplierFunctionReturning<U, void>
export type ParseFindMultiplierOption<U extends string = string> = Nullish<DeclarativeFindUnit | ParseFindMultiplierFunction<U>>

interface ParserOptionsBase<U extends ParseUnitOption> {
  readonly unit?: U
  readonly find?: ParseFindMultiplierOption<U extends string ? U : string>
  readonly match?: ParseMatchOption
}

export interface ParserOptionsWithUnit<U extends string> extends ParserOptionsBase<U> {
  readonly unit: U
}

export interface ParserOptionsWithoutUnit extends Omit<ParserOptionsBase<string>, 'unit'> {
  readonly unit?: Nullish
}

export type ParserOptions = ParserOptionsBase<ParseUnitOption>

export type ParseInput = unknown
export type Parser = (input: ParseInput) => number
