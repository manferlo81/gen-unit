import { TableItem } from './types'

// "round" OPTION

export interface RoundAdvancedOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type RoundFunction = (num: number) => (string | number);
export type RoundOption = number | RoundAdvancedOptions | RoundFunction

// "find" OPTION

export interface FindUnitResult {
  div: number;
  pre: string;
}

export type FindUnitFunction = (value: number) => FindUnitResult
export type FindUnitOption = FindUnitResult[] | FindUnitFunction

// "output" OPTION

export type FormatOutputFunction = (value: string | number, pre: string, unit: string) => string

// OPTIONS

export interface CreateFormatterOptions extends DeprecatedCreateFormatterOptions {
  unit?: string;
  find?: FindUnitOption;
  round?: RoundOption;
  output?: FormatOutputFunction;
}

export type FormatFunction = (value: number) => string

// DEPRECATED

interface DeprecatedCreateFormatterOptions {
  dec?: number | string;
  fixed?: boolean;
  table?: TableItem[];
}
