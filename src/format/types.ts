import type { ExponentFindItems, FindUnitAdvancedOptions } from '../common/types';

export type FormatGetUnitFunction = (value: number, rounded: string | number, pre: string) => string;
export type FormatUnitOption = string | FormatGetUnitFunction;

export interface DivisorFindItem {
  pre: string;
  div: number;
}
export type DivisorFindItems = DivisorFindItem[];

export type FormatFindUnitFunction = (value: number) => DivisorFindItem;
export type DeclarativeFormatFindUnitOption = number | ExponentFindItems | FindUnitAdvancedOptions;
export type FormatFindUnitOption = DeclarativeFormatFindUnitOption | FormatFindUnitFunction;

export interface FormatRoundAdvancedOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type RoundFunction = (num: number) => (string | number);
export type FormatRoundOption = number | FormatRoundAdvancedOptions | RoundFunction;

export type FormatOutputFunction = (value: string | number, pre: string, unit: string) => (string | number);

export interface CreateFormatterOptions {
  unit?: FormatUnitOption;
  find?: FormatFindUnitOption;
  round?: FormatRoundOption;
  output?: FormatOutputFunction;
}

export type FormatInput = number;
export type Formatter = (value: FormatInput) => string;
