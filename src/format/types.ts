import type { ExponentFindItems, FindUnitAdvancedOptions } from '../common/types';

export type GetUnitFunction = (value: number, rounded: string | number, pre: string) => string;

export interface DivisorFindItem {
  pre: string;
  div: number;
}
export type DivisorFindItems = DivisorFindItem[];

export type FindUnitFunction = (value: number) => DivisorFindItem;
export type DeclarativeFindUnitOption = number | ExponentFindItems | FindUnitAdvancedOptions;
export type FindUnitOption = DeclarativeFindUnitOption | FindUnitFunction;

export interface RoundAdvancedOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type RoundFunction = (num: number) => (string | number);
export type RoundOption = number | RoundAdvancedOptions | RoundFunction;

export type FormatOutputFunction = (value: string | number, pre: string, unit: string) => (string | number);

export interface CreateFormatterOptions {
  unit?: string | GetUnitFunction;
  find?: FindUnitOption;
  round?: RoundOption;
  output?: FormatOutputFunction;
}

export type FormatFunction = (value: number) => string;
