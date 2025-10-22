import type { DeclarativeFindUnit, ExponentFindItem, ExponentFindItems, FindUnitAdvancedOptions, FindUnitBase } from '../../src'
import type { And, AssignableTo, Equals, EqualsOptional, Expect, KeysEquals } from './tools'

export type Results = And<[
  Expect<Equals<DeclarativeFindUnit, FindUnitBase | ExponentFindItems | FindUnitAdvancedOptions>>,
  Expect<Equals<FindUnitBase, number>>,

  Expect<Equals<ExponentFindItems, ExponentFindItem[]>>,

  Expect<AssignableTo<ExponentFindItem, object>>,
  Expect<KeysEquals<ExponentFindItem, 'exp' | 'pre'>>,
  Expect<Equals<ExponentFindItem['exp'], number>>,
  Expect<Equals<ExponentFindItem['pre'], string>>,

  Expect<Equals<FindUnitAdvancedOptions, object>>,
  Expect<KeysEquals<FindUnitAdvancedOptions, 'base' | 'find' | 'items'>>,
  Expect<EqualsOptional<FindUnitAdvancedOptions['base'], number | null>>,
  Expect<EqualsOptional<FindUnitAdvancedOptions['items'], ExponentFindItems | null>>,
  Expect<EqualsOptional<FindUnitAdvancedOptions['find'], ExponentFindItems | null>>,
]>
