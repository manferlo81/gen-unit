import type { DeclarativeFindUnit } from '../common/types';
import type { AllowNullish, AllowReturnNullish } from '../tools/helper-types';

export type ParseMultiplier = number;
export type ParseFindMultiplierFunction = (pre: string, unit?: AllowNullish<string>) => AllowReturnNullish<ParseMultiplier>;
export type ParseFindMultiplierOption = DeclarativeFindUnit | ParseFindMultiplierFunction;

export interface CreateParserOptions {
  unit?: AllowNullish<string>;
  find?: AllowNullish<ParseFindMultiplierOption>;
}

export type ParseInput = unknown;
export type Parser = (input: ParseInput) => number;
