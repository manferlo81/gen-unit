import { error } from '../common/error';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import type { ExponentFindItem, ExponentFindItems } from '../common/types';
import { isArray, isFinite, isNumber } from '../tools/is';
import { pow } from '../tools/math';
import type { DeclarativeParseFindMultiplierOption } from './types';

type FindMultiplierTable = {
  [K in string]?: number;
};

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
 * transforms find items into
 * @param items
 * @param base
 * @returns
 */
function transformItems(items: ExponentFindItem[], base: number): FindMultiplierTable {

  return items.reduce<FindMultiplierTable>(
    (result, { pre, exp }) => {
      const multiplier = pow(base, exp);
      if (multiplier <= 0 || !isFinite(multiplier)) {
        throw error(`${base} to the power of ${exp} is not a valid multiplier`);
      }
      return {
        ...result,
        [pre]: multiplier,
      };
    },
    {},
  );

}

/**
 * creates a multiplier find table based on the "find" option
 *
 * @param find "find" option
 * @param unit "unit" option
 * @returns the multiplier find table from "find" option, or null if no "find" option
 */
export function createFindTable(find?: DeclarativeParseFindMultiplierOption): FindMultiplierTable {

  // return default table if no "find" option
  if (find == null) {
    return transformItems(
      defaultBase1000ParseFindItems,
      1000,
    );
  }

  // use "find" option as base if it's a number
  if (isNumber(find)) {
    return transformItems(
      defaultBase1000ParseFindItems,
      find,
    );
  }

  // use "find" option as items if it's an array
  if (isArray(find)) {
    return transformItems(
      find,
      1000,
    );
  }

  // get items and base from "find" option
  const { find: items, base = 1000 } = find;

  // use items if items provided
  if (items) {
    return transformItems(
      items,
      base,
    );
  }

  // use default items
  return transformItems(
    defaultBase1000ParseFindItems,
    base,
  );

}
