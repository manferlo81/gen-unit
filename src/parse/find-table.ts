import { error } from '../common/error';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import type { DeclarativeFindUnit, ExponentFindItem, ExponentFindItems, FindUnitBase } from '../common/types';
import type { AllowNullish } from '../tools/helper-types';
import { isArray, isFiniteNumber, isNumber } from '../tools/is';
import { pow } from '../tools/math';

interface MultiplierFindItem {
  pre: string;
  mul: number;
}

type FindMultiplierTable = MultiplierFindItem[];

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
 * transforms find items into a multiplier find table
 *
 * @param items find items
 * @param base base
 * @returns find multiplier table
 */
function transformItems(items: ExponentFindItem[], base: FindUnitBase): FindMultiplierTable {
  return items.map(({ pre, exp }) => {
    const multiplier = pow(base, exp);
    if (!isFiniteNumber(multiplier) || multiplier <= 0) {
      throw error(`${base} to the power of ${exp} is not a valid multiplier`);
    }
    return {
      pre,
      mul: multiplier,
    };
  });
}

/**
 * creates a multiplier find table based on the "find" option
 *
 * @param find "find" option
 * @returns the multiplier find table from "find" option
 */
export function createFindTable(find: AllowNullish<DeclarativeFindUnit>): FindMultiplierTable {

  // return default table if "find" option is null or undefined
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
  const { find: items, base } = find;
  const baseAsNumber = base ?? 1000;

  // use items if items provided
  if (items) {
    return transformItems(
      items,
      baseAsNumber,
    );
  }

  // use default items
  return transformItems(
    defaultBase1000ParseFindItems,
    baseAsNumber,
  );

}
