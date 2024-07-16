/** @deprecated */
export interface DivisorFindItem {
  readonly pre: string;
  /** @deprecated use mul instead */
  readonly div: number;
}

/** @deprecated */
export type DivisorFindItems = DivisorFindItem[];

/** @deprecated */
export type DeprecatedFormatFindUnitFunction = (value: number) => DivisorFindItem;

/** @deprecated */
export type DeprecatedFormatGetUnitFunction<U extends string = string> = (value: number, rounded: string | number, pre: string) => U;
