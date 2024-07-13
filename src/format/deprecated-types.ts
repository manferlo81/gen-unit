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
