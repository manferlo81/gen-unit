import { type FindExponentItems, type FindUnitAdvancedOptions } from '../common/types';
import { type DeprecatedCreateFormatterOptions } from './deprecated';

export type GetUnitFunction = (value: number, rounded: string | number, pre: string) => string;

export interface FindUnitResult {
  div: number;
  pre: string;
}

export type FindUnitFunction = (value: number) => FindUnitResult;
export type DeclarativeFindUnitOption = number | FindExponentItems | FindUnitAdvancedOptions;
export type FindUnitOption = DeclarativeFindUnitOption | FindUnitFunction;

export interface RoundAdvancedOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type RoundFunction = (num: number) => (string | number);
export type RoundOption = number | RoundAdvancedOptions | RoundFunction;

export type FormatOutputFunction = (value: string | number, pre: string, unit: string) => (string | number);

export interface CreateFormatterOptions extends DeprecatedCreateFormatterOptions {
  unit?: string | GetUnitFunction;
  find?: FindUnitOption;
  round?: RoundOption;
  output?: FormatOutputFunction;
}

export type FormatFunction = (value: number) => string;
