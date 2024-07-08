import type { ExponentFindItems, FindUnitAdvancedOptions } from '../common/types';

export type ParseMultiplierBase = number;
export type ParseFindMultiplierFunction = (pre: string, unit?: string) => number | null | undefined;
export type DeclarativeParseFindMultiplierOption = ParseMultiplierBase | ExponentFindItems | FindUnitAdvancedOptions;
export type ParseFindMultiplierOption = DeclarativeParseFindMultiplierOption | ParseFindMultiplierFunction;

export interface CreateParserOptions {
  unit?: string;
  find?: ParseFindMultiplierOption;
}

export type ParseInput = unknown;
export type Parser = (input: ParseInput) => number;
