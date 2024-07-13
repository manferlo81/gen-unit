import type { AllowNullish } from '../tools/helper-types';

interface BaseFindItem {
  readonly pre: string;
}

export interface ExponentFindItem extends BaseFindItem {
  readonly exp: number;
}
export type ExponentFindItems = ExponentFindItem[];

export interface MultiplierFindItem extends BaseFindItem {
  readonly mul: number;
}
export type MultiplierFindItems = MultiplierFindItem[];

export type FindUnitBase = number;

export interface FindUnitAdvancedOptions {
  readonly base?: AllowNullish<FindUnitBase>;
  readonly find?: AllowNullish<ExponentFindItems>;
}

export type DeclarativeFindUnit = FindUnitBase | ExponentFindItems | FindUnitAdvancedOptions;
