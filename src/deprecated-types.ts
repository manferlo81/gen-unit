import type { AllowNullish } from './common/private-types'
import type { ExponentFindItems } from './common/types'

/** @deprecated on: 14/7/2024, use: FindUnitAdvancedOptions */
export interface DeprecatedFindUnitAdvancedOptions {
  /** @deprecated on: 14/7/2024, use: "items" key */
  readonly find?: AllowNullish<ExponentFindItems>
}

/** @deprecated on: 13/7/2024, use: MultiplierFindItem */
export interface DivisorFindItem {
  readonly pre: string
  /** @deprecated on: 13/7/2024, use: "mul" key */
  readonly div: number
}

/** @deprecated on: 13/7/2024, use: MultiplierFindItems */
export type DivisorFindItems = DivisorFindItem[]

/** @deprecated on: 13/7/2024, use: FormatFindUnitFunction */
export type DeprecatedFormatFindUnitFunction = (value: number) => DivisorFindItem

/** @deprecated on: 13/7/2024, use: "unit" option as string */
export type DeprecatedFormatGetUnitFunction<U extends string = string> = (value: number, rounded: string | number, pre: string) => U
