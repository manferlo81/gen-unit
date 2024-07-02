import { DeprecatedTableItem } from '../common/deprecated';

/** @deprecated */
export interface DeprecatedCreateParserOptions {
  /** @deprecated use "find" option */
  table?: DeprecatedTableItem[];
}

/** @deprecated return a number instead */
export interface MultiplierFound {
  /** @deprecated return a number instead */
  mul: number | null | undefined;
}

/** @deprecated return a number instead */
export type DeprecatedFindMultiplierFunction = (capturedHoleUnit: string) => number | MultiplierFound | null | undefined;
