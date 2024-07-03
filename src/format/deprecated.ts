import type { DeprecatedTableItem } from '../common/deprecated';

/** @deprecated */
export interface DeprecatedCreateFormatterOptions {
  /** @deprecated use "round" option */
  dec?: number | string;
  /** @deprecated use "round" option */
  fixed?: boolean;
  /** @deprecated use "find" option */
  table?: DeprecatedTableItem[];
}
