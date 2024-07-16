import type { DeclarativeFindUnit } from '../common/types';
import type { AllowNullish, AllowReturnNullish } from '../common/helper-types';

export type ParseUnitOption = AllowNullish<string>;

export type InputMatchResults = [value: string, wholeUnit: string];
export type MatchFunction = (input: string) => InputMatchResults | null;
export type RegExpPattern = RegExp | string;
export type ParseMatchOption = AllowNullish<RegExpPattern | MatchFunction>;

export type ParseMultiplier = number;
export type ParseFindMultiplierFunction<U extends ParseUnitOption = ParseUnitOption> = (pre: string, unit: U) => AllowReturnNullish<ParseMultiplier>;
export type ParseFindMultiplierOption<U extends ParseUnitOption = ParseUnitOption> = AllowNullish<DeclarativeFindUnit | ParseFindMultiplierFunction<U>>;

interface CreateParserOptionsBase<U extends ParseUnitOption> {
  readonly match?: ParseMatchOption;
  readonly find?: ParseFindMultiplierOption<U>;
}

export type CreateParserOptionsWithoutUnit = CreateParserOptionsBase<undefined>;

export interface CreateParserOptionsWithUnit<U extends ParseUnitOption> extends CreateParserOptionsBase<U> {
  readonly unit: U;
}

export type CreateParserOptions = Partial<CreateParserOptionsWithUnit<ParseUnitOption>>;

export type ParseInput = unknown;
export type Parser = (input: ParseInput) => number;
