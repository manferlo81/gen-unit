import type { FindExponentItems, FindUnitAdvancedOptions } from '../common/types';
import type { DeprecatedFindMultiplierFunction } from './deprecated-types';

export type BaseFindMultiplierOption = number;

export type FindMultiplierFunction = (capturedHoleUnit: string) => number | null | undefined;
export type DeclarativeFindMultiplierOption = BaseFindMultiplierOption | FindExponentItems | FindUnitAdvancedOptions;
export type FindMultiplierOption = DeclarativeFindMultiplierOption | FindMultiplierFunction | DeprecatedFindMultiplierFunction;

export interface CreateParserOptions {
  unit?: string;
  find?: FindMultiplierOption;
}

export type ParseInput = unknown;
export type ParseFunction = (input: ParseInput) => number;
