import type { AllowNullish } from './helper-types';
import { isArray, isNumber, isObject } from './is';
import type { DeprecatedFindUnitAdvancedOptions } from './deprecated-types';
import { errorInvalidOption } from './error';
import { transformFindItems } from './transform-items';
import type { DeclarativeFindUnit, ExponentFindItems, FindUnitAdvancedOptions, MultiplierFindItems } from './types';

function deprecated_transformAdvancedOptions(find: FindUnitAdvancedOptions): Omit<FindUnitAdvancedOptions, keyof DeprecatedFindUnitAdvancedOptions> {
  if ('items' in find || !('find' in find)) {
    return find;
  }
  const { find: items, base } = find;
  return { items, base };
}

export function createFindTable(find: AllowNullish<DeclarativeFindUnit>, defaultItems: ExponentFindItems, validateItems: (items: ExponentFindItems) => ExponentFindItems): MultiplierFindItems {

  // return default table if "find" option is null or undefined
  if (find == null) {
    return transformFindItems(
      defaultItems,
      1000,
    );
  }

  // use "find" option as base if it's a number
  if (isNumber(find)) {
    return transformFindItems(
      defaultItems,
      find,
    );
  }

  // use "find" option as items if it's an array
  if (isArray(find)) {
    return transformFindItems(
      validateItems(find),
      1000,
    );
  }

  // throw if "find" option is not an object at this point
  if (!isObject(find)) {
    throw errorInvalidOption('find');
  }

  // get items and base from "find" option
  const { items, base } = deprecated_transformAdvancedOptions(find);

  // normalize base
  const baseAsNumber = base ?? 1000;

  // return default items with given base if no items provided
  if (items == null) {
    return transformFindItems(
      defaultItems,
      baseAsNumber,
    );
  }

  // throw if items is not an array at this point
  if (!isArray(items)) {
    // TODO: Throw more descriptive error
    throw errorInvalidOption('find');
  }

  // return items based on option
  return transformFindItems(
    validateItems(items),
    baseAsNumber,
  );

}
