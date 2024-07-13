import type { AllowNullish } from '../tools/helper-types';

interface BaseFindItem {
  pre: string;
}

export interface ExponentFindItem extends BaseFindItem {
  exp: number;
}
export type ExponentFindItems = ExponentFindItem[];

export interface MultiplierFindItem extends BaseFindItem {
  mul: number;
}
export type MultiplierFindItems = MultiplierFindItem[];

export type FindUnitBase = number;

export interface FindUnitAdvancedOptions {
  base?: AllowNullish<FindUnitBase>;
  find?: AllowNullish<ExponentFindItems>;
}

export type DeclarativeFindUnit = FindUnitBase | ExponentFindItems | FindUnitAdvancedOptions;
