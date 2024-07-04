import type { DeprecatedTableItem } from '../common/deprecated';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import type { FindExponentItems } from '../common/types';
import { isArray } from '../tools/is-array';
import { isNumber } from '../tools/is-number';
import { pow } from '../tools/math';
import type { DeclarativeFindUnitOption, FindUnitResult } from './types';

function transformFindUnitArray(units: FindExponentItems, base: number): FindUnitResult[] {
  return units.map<FindUnitResult>(({ pre, exp }) => {
    return {
      pre,
      div: pow(base, exp),
    };
  });
}

function sortFindUnitArray(units: FindExponentItems, base: number): FindUnitResult[] {
  return transformFindUnitArray(units, base).sort(
    (a, b) => (b.div - a.div),
  );
}

export const unity: FindUnitResult = { pre: '', div: 1 };

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

export function createFindItems(find?: DeclarativeFindUnitOption): FindUnitResult[] | null {

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

export function createFindItems_deprecated(find?: DeclarativeFindUnitOption, deprecatedTable?: DeprecatedTableItem[]): FindUnitResult[] {

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
