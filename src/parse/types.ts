import { type DeprecatedCreateParserOptions } from './deprecated';

export interface FindMultiplierExpItem {
  pre: string;
  exp: number;
}

export interface FindMultiplierAdvancedOptions {
  base?: number;
  find?: FindMultiplierExpItem[];
}

export interface MultiplierFound {
  mul: number;
}

export type FindMultiplierUserFunction = (capturedHoleUnit: string) => number | null | MultiplierFound;
export type FindMultiplierFunction = (capturedWholeUnit: string) => MultiplierFound | null;
export type DeclarativeFindMultiplierOption = number | FindMultiplierExpItem[] | FindMultiplierAdvancedOptions;
export type FindMultiplierOption = DeclarativeFindMultiplierOption | FindMultiplierUserFunction;

export interface CreateParserOptions extends DeprecatedCreateParserOptions {
  unit?: string;
  find?: FindMultiplierOption;
}

export type ParseInput = unknown;
export type ParseFunction = (input: ParseInput) => number;
