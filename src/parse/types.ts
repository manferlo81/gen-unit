import { type DeprecatedCreateParserOptions } from './deprecated';
import { MultiplierFound } from './internal-types';

export interface FindMultiplierExpItem {
  pre: string;
  exp: number;
}

export type BaseFindMultiplierOption = number;
export type FindMultiplierExpItems = FindMultiplierExpItem[];

export interface FindMultiplierAdvancedOptions {
  base?: BaseFindMultiplierOption;
  find?: FindMultiplierExpItems;
}

export type FindMultiplierFunction = (capturedHoleUnit: string) => number | null | MultiplierFound;
export type DeclarativeFindMultiplierOption = BaseFindMultiplierOption | FindMultiplierExpItems | FindMultiplierAdvancedOptions;
export type FindMultiplierOption = DeclarativeFindMultiplierOption | FindMultiplierFunction;

export interface CreateParserOptions extends DeprecatedCreateParserOptions {
  unit?: string;
  find?: FindMultiplierOption;
}

export type ParseInput = unknown;
export type ParseFunction = (input: ParseInput) => number;
