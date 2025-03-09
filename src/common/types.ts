import type { DeprecatedFindUnitAdvancedOptions } from '../deprecated-types'
import type { AllowNullish } from './private-types'

interface BaseFindItem {
  readonly pre: string
}

export interface ExponentFindItem extends BaseFindItem {
  readonly exp: number
}
export type ExponentFindItems = ExponentFindItem[]

export interface MultiplierFindItem extends BaseFindItem {
  readonly mul: number
}
export type MultiplierFindItems = MultiplierFindItem[]

export type FindUnitBase = number

// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface FindUnitAdvancedOptions extends DeprecatedFindUnitAdvancedOptions {
  readonly base?: AllowNullish<FindUnitBase>
  readonly items?: AllowNullish<ExponentFindItems>
}

export type DeclarativeFindUnit = FindUnitBase | ExponentFindItems | FindUnitAdvancedOptions
