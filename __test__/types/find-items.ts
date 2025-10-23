import type { DeclarativeFindUnit, ExponentFindItem, ExponentFindItems, FindUnitAdvancedOptions, FindUnitBase, MultiplierFindItem, MultiplierFindItems } from '../../src'
import type { And, AssignableTo, Equals, EqualsOptional, Expect, KeysEquals } from './tools'

export type Results = And<[
  Expect<Equals<DeclarativeFindUnit, FindUnitBase | ExponentFindItems | FindUnitAdvancedOptions>>,
  Expect<Equals<FindUnitBase, number>>,

  Expect<Equals<ExponentFindItems, ExponentFindItem[]>>,
  Expect<Equals<MultiplierFindItems, MultiplierFindItem[]>>,

  Expect<AssignableTo<ExponentFindItem, object>>,
  Expect<KeysEquals<ExponentFindItem, 'pre' | 'exp'>>,
  Expect<Equals<ExponentFindItem['pre'], string>>,
  Expect<Equals<ExponentFindItem['exp'], number>>,

  Expect<AssignableTo<MultiplierFindItem, object>>,
  Expect<KeysEquals<MultiplierFindItem, 'pre' | 'mul'>>,
  Expect<Equals<MultiplierFindItem['pre'], string>>,
  Expect<Equals<MultiplierFindItem['mul'], number>>,

  Expect<Equals<FindUnitAdvancedOptions, object>>,
  Expect<KeysEquals<FindUnitAdvancedOptions, 'base' | 'find' | 'items'>>,
  Expect<EqualsOptional<FindUnitAdvancedOptions['base'], number | null>>,
  Expect<EqualsOptional<FindUnitAdvancedOptions['items'], ExponentFindItems | null>>,
  Expect<EqualsOptional<FindUnitAdvancedOptions['find'], ExponentFindItems | null>>,
]>
