import type { AllowNullish } from '../common/helper-types';
import type { DeclarativeFindUnit } from '../common/types';

export type ParseUnitOption = AllowNullish<string>;

export type InputMatchResults = [value: string, wholeUnit: string];
export type MatchFunction = (input: string) => AllowNullish<InputMatchResults>;
export type RegExpPattern = RegExp | string;
export type ParseMatchOption = AllowNullish<RegExpPattern | MatchFunction>;

export type ParseMultiplier = number;
export type ParseFindMultiplierFunction<U extends ParseUnitOption = ParseUnitOption> = (prefix: string, unit: U) => AllowNullish<ParseMultiplier>;
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
