import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import type { DeclarativeFindUnit, ExponentFindItems } from '../common/types';
import type { AllowNullish } from '../tools/helper-types';
import { isArray, isNumber } from '../tools/is';
import { pow } from '../tools/math';
import type { DivisorFindItem, DivisorFindItems } from './types';

function transformFindUnitArray(units: ExponentFindItems, base: number): DivisorFindItems {
  return units.map<DivisorFindItem>(({ pre, exp }) => {
    return {
      pre,
      div: pow(base, exp),
    };
  });
}

function sortFindUnitArray(units: ExponentFindItems, base: number): DivisorFindItems {
  return transformFindUnitArray(units, base).sort(
    (a, b) => (b.div - a.div),
  );
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
    return transformFindUnitArray(
      defaultBase1000FormatFindItems,
      1000,
    );
  }

  if (isNumber(find)) {
    return transformFindUnitArray(
      defaultBase1000FormatFindItems,
      find,
    );
  }

  if (isArray(find)) {
    return sortFindUnitArray(
      find,
      1000,
    );
  }

  const { find: items, base } = find;
  const baseAsNumber = base ?? 1000;

  if (items) {
    return sortFindUnitArray(
      items,
      baseAsNumber,
    );
  }

  return transformFindUnitArray(
    defaultBase1000FormatFindItems,
    baseAsNumber,
  );

}
