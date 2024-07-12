import type { AllowNullish } from '../tools/helper-types';

export interface ExponentFindItem {
  pre: string;
  exp: number;
}

export type FindUnitBase = number;
export type ExponentFindItems = ExponentFindItem[];

export interface FindUnitAdvancedOptions {
  base?: AllowNullish<FindUnitBase>;
  find?: AllowNullish<ExponentFindItems>;
}

export type DeclarativeFindUnit = FindUnitBase | ExponentFindItems | FindUnitAdvancedOptions;
