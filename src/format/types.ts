import type { DeclarativeFindUnit } from '../common/types';
import { AllowNullish } from '../tools/helper-types';

export type FormatGetUnitFunction = (value: number, rounded: string | number, pre: string) => string;
export type FormatUnitOption = string | FormatGetUnitFunction;

export interface DivisorFindItem {
  pre: string;
  div: number;
}
export type DivisorFindItems = DivisorFindItem[];

export type FormatFindUnitFunction = (value: number) => DivisorFindItem;
export type FormatFindUnitOption = DeclarativeFindUnit | FormatFindUnitFunction;

export type RoundDec = number;

export type RoundFunction = (num: number) => (string | number);
export interface FormatRoundAdvancedOptions {
  // FIXME: don't allow string here
  dec?: AllowNullish<RoundDec | string>;
  fixed?: AllowNullish<boolean>;
}
export type FormatRoundOption = RoundDec | FormatRoundAdvancedOptions | RoundFunction;

export type FormatOutputFunction = (value: string | number, pre: string, unit: string) => (string | number);

export interface CreateFormatterOptions {
  unit?: AllowNullish<FormatUnitOption>;
  find?: AllowNullish<FormatFindUnitOption>;
  round?: AllowNullish<FormatRoundOption>;
  output?: AllowNullish<FormatOutputFunction>;
}

export type FormatInput = number;
export type Formatter = (value: FormatInput) => string;
