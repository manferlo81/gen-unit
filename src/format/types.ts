import { DeprecatedTableItem } from '../types';
// "unit" OPTION

export type GetUnitFunction = (value: number, rounded: string | number, pre: string) => string

// "find" OPTION

export interface FindUnitResult {
  div: number;
  pre: string;
}

export interface FindUnitExpResult {
  exp: number;
  pre: string;
}

export interface AdvancedFindUnit {
  base?: number;
  find?: Array<FindUnitResult | FindUnitExpResult>;
}

export type FindUnitFunction = (value: number) => FindUnitResult
export type FindUnitOption = AdvancedFindUnit | Array<FindUnitResult | FindUnitExpResult> | FindUnitFunction

// "round" OPTION

export interface RoundAdvancedOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type RoundFunction = (num: number) => (string | number);
export type RoundOption = number | RoundAdvancedOptions | RoundFunction

// "output" OPTION

export type FormatOutputFunction = (value: string | number, pre: string, unit: string) => string

// OPTIONS

export interface CreateFormatterOptions extends DeprecatedCreateFormatterOptions {
  unit?: string | GetUnitFunction;
  find?: FindUnitOption;
  round?: RoundOption;
  output?: FormatOutputFunction;
}

export type FormatFunction = (value: number) => string

// DEPRECATED

interface DeprecatedCreateFormatterOptions {
  dec?: number | string;
  fixed?: boolean;
  table?: DeprecatedTableItem[];
}
