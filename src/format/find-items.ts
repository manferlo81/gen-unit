import { errorInvalidOption } from '../common/error';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import { transformFindItems } from '../common/transform-items';
import type { DeclarativeFindUnit, ExponentFindItems, MultiplierFindItem, MultiplierFindItems } from '../common/types';
import type { AllowNullish } from '../tools/helper-types';
import { isArray, isNumber, isObject } from '../tools/is';

function sortExponentItems(units: ExponentFindItems): ExponentFindItems {
  return units.sort((a, b) => b.exp - a.exp);
}

export const unity: MultiplierFindItem = { pre: '', mul: 1 };

// IMPORTANT TO DEVELOPERS
// this array has to be sorted from bigger to smaller unit!
// while using this array internally we skip sorting it as it is expected to be already sorted
// unlike arrays provided by the user which will be sorted
const defaultBase1000FormatFindItems: ExponentFindItems = [
  exa,
  peta,
  tera,
  giga,
  mega,
  kilo,
  { exp: 0, pre: '' },
  milli,
  micro,
  nano,
  pico,
  femto,
  atto,
];

export function createFindItems(find: AllowNullish<DeclarativeFindUnit>): MultiplierFindItems {

  // return default items "find" option is null or undefined
  if (find == null) {
    return transformFindItems(
      defaultBase1000FormatFindItems,
      1000,
    );
  }

  if (isNumber(find)) {
    // TODO: check for base validity
    return transformFindItems(
      defaultBase1000FormatFindItems,
      find,
    );
  }

  if (isArray(find)) {
    return transformFindItems(
      sortExponentItems(find),
      1000,
    );
  }

  // throw if "find" option is not an object at this point
  if (!isObject(find)) {
    throw errorInvalidOption('find');
  }

  // get sub-options
  const { find: items, base } = find;

  // normalize base
  const baseAsNumber = base ?? 1000;

  // return default items with given base if no items provided
  if (items == null) {
    return transformFindItems(
      defaultBase1000FormatFindItems,
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
    sortExponentItems(items),
    baseAsNumber,
  );

}
