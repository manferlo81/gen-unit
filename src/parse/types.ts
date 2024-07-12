import type { DeclarativeFindUnit } from '../common/types';
import type { AllowNullish, AllowReturnNullish } from '../tools/helper-types';

export type ParseUnitOption = AllowNullish<string>;

export type InputMatchResults = [value: string, wholeUnit: string];
export type MatchFunction = (input: string) => InputMatchResults | null;
export type RegExpPattern = RegExp | string;
export type ParseMatchOption = AllowNullish<RegExpPattern | MatchFunction>;

export type ParseMultiplier = number;
export type ParseFindMultiplierFunction<U extends ParseUnitOption = ParseUnitOption> = (pre: string, unit: U) => AllowReturnNullish<ParseMultiplier>;
export type ParseFindMultiplierOption<U extends ParseUnitOption = ParseUnitOption> = AllowNullish<DeclarativeFindUnit | ParseFindMultiplierFunction<U>>;

export interface CreateParserOptions<U extends ParseUnitOption = ParseUnitOption> {
  unit?: U;
  match?: ParseMatchOption;
  find?: ParseFindMultiplierOption<U>;
}

export interface CreateParserOptionsWithUnit<U extends ParseUnitOption> extends CreateParserOptions<U> {
  unit: U;
}

export type ParseInput = unknown;
export type Parser = (input: ParseInput) => number;
