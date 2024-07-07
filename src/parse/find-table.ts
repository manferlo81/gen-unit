import { error } from '../common/error';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import type { ExponentFindItem, ExponentFindItems } from '../common/types';
import { isArray, isNumber } from '../tools/is';
import { pow } from '../tools/math';
import type { DeclarativeFindMultiplierOption } from './types';

type FindMultiplierTable = Partial<Record<string, number>>;

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

function populateMultiplierTable(result: FindMultiplierTable, pre: string, multiplier: number): FindMultiplierTable {
  return {
    ...result,
    [pre]: multiplier,
  };
}

/**
 * transforms find items into
 * @param items
 * @param base
 * @param unit
 * @returns
 */
function transformItems(items: ExponentFindItem[], base: number, unit = ''): FindMultiplierTable {

  const populate: (result: FindMultiplierTable, pre: string, value: number) => FindMultiplierTable = unit ? (
    (result, pre, multiplier) => {
      return populateMultiplierTable(
        populateMultiplierTable(
          result,
          pre,
          multiplier,
        ),
        `${pre}${unit}`,
        multiplier,
      );
    }
  ) : populateMultiplierTable;

  return items.reduce<FindMultiplierTable>(
    (result, { pre, exp }) => {
      const multiplier = pow(base, exp);
      if (multiplier <= 0 || !isFinite(multiplier)) {
        throw error(`${base} to the power of ${exp} is not a valid multiplier`);
      }
      return populate(result, pre, multiplier);
    },
    {},
  );

}

/**
 * creates a multiplier find table based on the "find" option
 *
 * @param unit "unit" option
 * @param find "find" option
 * @returns the multiplier find table from "find" option, or null if no "find" option
 */
export function createFindTable(unit?: string, find?: DeclarativeFindMultiplierOption): FindMultiplierTable {

  // return default table if no "find" option
  if (find == null) {
    return transformItems(
      defaultBase1000ParseFindItems,
      1000,
      unit,
    );
  }

  // use "find" option as base if it's a number
  if (isNumber(find)) {
    return transformItems(
      defaultBase1000ParseFindItems,
      find,
      unit,
    );
  }

  // use "find" option as items if it's an array
  if (isArray(find)) {
    return transformItems(
      find,
      1000,
      unit,
    );
  }

  // get items and base from "find" option
  const { find: items, base = 1000 } = find;

  // use items if items provided
  if (items) {
    return transformItems(
      items,
      base,
      unit,
    );
  }

  // use default items
  return transformItems(
    defaultBase1000ParseFindItems,
    base,
    unit,
  );

}
