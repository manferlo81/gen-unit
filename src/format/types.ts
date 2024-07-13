import type { DeclarativeFindUnit, MultiplierFindItem } from '../common/types';
import type { AllowNullish } from '../tools/helper-types';
import { DeprecatedFormatFindUnitFunction } from './deprecated-types';

export type FormatGetUnitFunction = (value: number, rounded: string | number, pre: string) => string;
export type FormatUnitOption = AllowNullish<string | FormatGetUnitFunction>;

export type FormatFindUnitFunction = (value: number) => MultiplierFindItem;
export type FormatFindUnitOption = AllowNullish<DeclarativeFindUnit | FormatFindUnitFunction | DeprecatedFormatFindUnitFunction>;

export type RoundDec = number;

export type RoundFunction = (num: number) => (string | number);
export interface FormatRoundAdvancedOptions {
  // FIXME: don't allow string here
  readonly dec?: AllowNullish<RoundDec | string>;
  readonly fixed?: AllowNullish<boolean>;
}
export type FormatRoundOption = AllowNullish<RoundDec | FormatRoundAdvancedOptions | RoundFunction>;

export type FormatOutputFunction = (value: string | number, pre: string, unit: string) => (string | number);
export type FormatOutputOption = AllowNullish<FormatOutputFunction>;

export interface CreateFormatterOptions {
  readonly unit?: FormatUnitOption;
  readonly find?: FormatFindUnitOption;
  readonly round?: FormatRoundOption;
  readonly output?: FormatOutputOption;
}

export type FormatInput = number;
export type Formatter = (value: FormatInput) => string;
