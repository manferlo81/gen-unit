import { type FindExponentItems } from '../common/types';
import { type DeprecatedCreateParserOptions, type DeprecatedFindMultiplierFunction } from './deprecated';

export type BaseFindMultiplierOption = number;

export interface FindMultiplierAdvancedOptions {
  base?: BaseFindMultiplierOption;
  find?: FindExponentItems;
}

export type FindMultiplierFunction = (capturedHoleUnit: string) => number | null | undefined;
export type DeclarativeFindMultiplierOption = BaseFindMultiplierOption | FindExponentItems | FindMultiplierAdvancedOptions;
export type FindMultiplierOption = DeclarativeFindMultiplierOption | FindMultiplierFunction | DeprecatedFindMultiplierFunction;

export interface CreateParserOptions extends DeprecatedCreateParserOptions {
  unit?: string;
  find?: FindMultiplierOption;
}

export type ParseInput = unknown;
export type ParseFunction = (input: ParseInput) => number;
