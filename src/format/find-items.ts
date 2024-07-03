import type { DeprecatedTableItem } from '../common/deprecated';
import type { FindExponentItems } from '../common/types';
import { MICRO } from '../constants';
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

export const unity = { pre: '', div: 1 };

const defaultFindResults = [
  { exp: 4, pre: 'T' },
  { exp: 3, pre: 'G' },
  { exp: 2, pre: 'M' },
  { exp: 1, pre: 'K' },
  { exp: 0, pre: '' },
  { exp: -1, pre: 'm' },
  { exp: -2, pre: MICRO },
  { exp: -3, pre: 'n' },
  { exp: -4, pre: 'p' },
  { exp: -5, pre: 'f' },
];

export function createFindItems(find?: DeclarativeFindUnitOption): FindUnitResult[] | null {

  if (!find) {
    return null;
  }

  if (isNumber(find)) {
    return transformFindUnitArray(defaultFindResults, find);
  }

  if (isArray(find)) {
    return sortFindUnitArray(find, 1000);
  }

  const { find: items, base = 1000 } = find;

  if (items) {
    return sortFindUnitArray(items, base);
  }

  return transformFindUnitArray(defaultFindResults, base);

}

export function createFindItems_deprecated(find?: DeclarativeFindUnitOption, deprecatedTable?: DeprecatedTableItem[]): FindUnitResult[] {

  const results = createFindItems(find);

  if (results) return results;

  if (!deprecatedTable) {
    return transformFindUnitArray(
      defaultFindResults,
      1000,
    );
  }

  return sortFindUnitArray(
    deprecatedTable.map(({ pre, power }) => ({ pre, exp: power })),
    10,
  );

}
