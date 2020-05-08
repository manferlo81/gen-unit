import { DeprecatedTableItem } from '../types';

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
export type FindMultiplierUserFunction = (unit: string) => number | null | MultiplierFound;
export type FindMultiplierFunction = (unit: string) => MultiplierFound | null;
export type DeclarativeFindMultiplierOption = number | FindMultiplierExpItem[] | FindMultiplierAdvancedOptions;
export type FindMultiplierOption = DeclarativeFindMultiplierOption | FindMultiplierUserFunction;

export interface CreateParserOptions extends DeprecatedCreateParserOptions {
  unit?: string;
  find?: FindMultiplierOption;
}

export type ParseInput = string | number | object;
export type ParseFunction = (input: ParseInput) => number;

// DEPRECATED

interface DeprecatedCreateParserOptions {
  table?: DeprecatedTableItem[];
}
