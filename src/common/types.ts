import type { DeprecatedFindUnitAdvancedOptions } from '../deprecated-types'
import type { Nullish } from './private-types'

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

export interface FindUnitAdvancedOptions extends DeprecatedFindUnitAdvancedOptions {
  readonly base?: Nullish<FindUnitBase>
  readonly items?: Nullish<ExponentFindItems>
}

export type DeclarativeFindUnit = FindUnitBase | ExponentFindItems | FindUnitAdvancedOptions
