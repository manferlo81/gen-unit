import type { DeprecatedFindUnitAdvancedOptions } from '../deprecated-types'
import { errorInvalidOption } from './error'
import { isArray, isNullish, isNumber, isObject } from './is'
import type { Nullish } from './private-types'
import { transformFindItems } from './transform-items'
import type { DeclarativeFindUnit, ExponentFindItems, FindUnitAdvancedOptions, MultiplierFindItems } from './types'

/** @deprecated */
function deprecated_transformAdvancedOptions(find: FindUnitAdvancedOptions): Omit<FindUnitAdvancedOptions, keyof DeprecatedFindUnitAdvancedOptions> {

  // return option if it's a modern option
  if ('items' in find || !('find' in find)) return find

  // handle deprecated option
  // use deprecated 'find' member as modern 'items' member
  // return modern option based on deprecated option
  const { find: items, base } = find
  return { items, base }

}

export function createFindTable(find: Nullish<DeclarativeFindUnit>, defaultItems: ExponentFindItems, validateItems: (items: ExponentFindItems) => ExponentFindItems): MultiplierFindItems {

  // return default table if "find" option is null or undefined
  if (isNullish(find)) return transformFindItems(defaultItems, 1000)

  // use find option as base if it's a number
  if (isNumber(find)) return transformFindItems(defaultItems, find)

  // use find option as items if it's an array
  if (isArray(find)) return transformFindItems(validateItems(find), 1000)

  // throw if find option is not an object at this point
  if (!isObject(find)) throw errorInvalidOption('find')

  // get items and base from find option

  const { items, base } = deprecated_transformAdvancedOptions(find)

  // normalize base
  const normalizedBase = base ?? 1000

  // return default items with given base if no items provided
  if (isNullish(items)) return transformFindItems(defaultItems, normalizedBase)

  // TODO: Throw more descriptive error
  // throw if items is not an array at this point
  if (!isArray(items)) throw errorInvalidOption('find')

  // return items based on option
  return transformFindItems(validateItems(items), normalizedBase)

}
