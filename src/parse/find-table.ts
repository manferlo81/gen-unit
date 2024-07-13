import { errorInvalidOption } from '../common/error';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import { transformFindItems } from '../common/transform-items';
import type { DeclarativeFindUnit, ExponentFindItems, MultiplierFindItems } from '../common/types';
import type { AllowNullish } from '../tools/helper-types';
import { isArray, isNumber, isObject } from '../tools/is';

export const defaultBase1000ParseFindItems: ExponentFindItems = [
  exa,
  peta,
  tera,
  giga,
  { pre: 'meg', exp: 2 },
  mega,
  { pre: 'K', exp: 1 },
  kilo,
  milli,
  { pre: 'u', exp: -2 },
  micro,
  nano,
  pico,
  femto,
  atto,
];

/**
 * creates a multiplier find table based on the "find" option
 *
 * @param find "find" option
 * @returns the multiplier find table from "find" option
 */
export function createFindTable(find: AllowNullish<DeclarativeFindUnit>): MultiplierFindItems {

  // return default table if "find" option is null or undefined
  if (find == null) {
    return transformFindItems(
      defaultBase1000ParseFindItems,
      1000,
    );
  }

  // use "find" option as base if it's a number
  if (isNumber(find)) {
    return transformFindItems(
      defaultBase1000ParseFindItems,
      find,
    );
  }

  // use "find" option as items if it's an array
  if (isArray(find)) {
    return transformFindItems(
      find,
      1000,
    );
  }

  // throw if "find" option is not an object at this point
  if (!isObject(find)) {
    throw errorInvalidOption('find');
  }

  // get items and base from "find" option
  const { find: items, base } = find;
  const baseAsNumber = base ?? 1000;

  // return default items with given base if no items provided
  if (items == null) {
    return transformFindItems(
      defaultBase1000ParseFindItems,
      baseAsNumber,
    );
  }

  // throw if items is not an array at this point
  if (!isArray(items)) {
    // TODO: Throw more descriptive error
    throw errorInvalidOption('find');
  }

  // use items if items provided
  return transformFindItems(
    items,
    baseAsNumber,
  );

}
