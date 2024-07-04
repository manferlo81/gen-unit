import type { DeprecatedTableItem } from '../common/deprecated-types';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import type { FindExponentItems } from '../common/types';
import { isArray } from '../tools/is-array';
import { isNumber } from '../tools/is-number';
import { pow } from '../tools/math';
import type { DeclarativeFindUnitOption, FindDivisorItem, FindDivisorItems } from './types';

function transformFindUnitArray(units: FindExponentItems, base: number): FindDivisorItems {
  return units.map<FindDivisorItem>(({ pre, exp }) => {
    return {
      pre,
      div: pow(base, exp),
    };
  });
}

function sortFindUnitArray(units: FindExponentItems, base: number): FindDivisorItems {
  return transformFindUnitArray(units, base).sort(
    (a, b) => (b.div - a.div),
  );
}

export const unity: FindDivisorItem = { pre: '', div: 1 };

// IMPORTANT TO DEVELOPERS
// this array has to be sorted from bigger to smaller unit!
// while using this array internally we skip sorting it as it is expected to be already sorted
// unlike arrays provided by the user which will be sorted
const defaultBase1000FormatFindItems: FindExponentItems = [
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

export function createFindItems(find?: DeclarativeFindUnitOption): FindDivisorItems | null {

  if (!find) {
    return null;
  }

  if (isNumber(find)) {
    return transformFindUnitArray(defaultBase1000FormatFindItems, find);
  }

  if (isArray(find)) {
    return sortFindUnitArray(find, 1000);
  }

  const { find: items, base = 1000 } = find;

  if (items) {
    return sortFindUnitArray(items, base);
  }

  return transformFindUnitArray(defaultBase1000FormatFindItems, base);

}

export function createFindItems_deprecated(find?: DeclarativeFindUnitOption, deprecatedTable?: DeprecatedTableItem[]): FindDivisorItems {

  const results = createFindItems(find);

  if (results) return results;

  if (!deprecatedTable) {
    return transformFindUnitArray(
      defaultBase1000FormatFindItems,
      1000,
    );
  }

  return sortFindUnitArray(
    deprecatedTable.map(({ pre, power }) => ({ pre, exp: power })),
    10,
  );

}
