import { errorInvalidOption } from '../common/error';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import { transformFindItems } from '../common/transform-items';
import type { DeclarativeFindUnit, ExponentFindItems } from '../common/types';
import type { AllowNullish } from '../tools/helper-types';
import { isArray, isNumber, isObject } from '../tools/is';
import type { DivisorFindItem, DivisorFindItems } from './types';

function transformExponentItems(items: ExponentFindItems, base: number): DivisorFindItems {
  return transformFindItems(items, base).map(({ pre, mul: div }) => ({ pre, div }));
}

function sortExponentItems(units: ExponentFindItems): ExponentFindItems {
  return units.sort((a, b) => b.exp - a.exp);
}

export const unity: DivisorFindItem = { pre: '', div: 1 };

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

export function createFindItems(find: AllowNullish<DeclarativeFindUnit>): DivisorFindItems {

  if (!find) {
    return transformExponentItems(
      defaultBase1000FormatFindItems,
      1000,
    );
  }

  if (isNumber(find)) {
    return transformExponentItems(
      defaultBase1000FormatFindItems,
      find,
    );
  }

  if (isArray(find)) {
    return transformExponentItems(
      sortExponentItems(find),
      1000,
    );
  }

  if (!isObject(find)) {
    throw errorInvalidOption('find');
  }

  const { find: items, base } = find;
  const baseAsNumber = base ?? 1000;

  if (items == null) {
    return transformExponentItems(
      defaultBase1000FormatFindItems,
      baseAsNumber,
    );
  }

  if (!isArray(items)) {
    // TODO: Give more descriptive error
    throw errorInvalidOption('find');
  }

  return transformExponentItems(
    sortExponentItems(items),
    baseAsNumber,
  );

}
