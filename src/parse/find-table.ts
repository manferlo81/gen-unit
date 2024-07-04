import type { DeprecatedTableItem } from '../common/deprecated-types';
import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/find-items';
import type { FindExponentItem, FindExponentItems } from '../common/types';
import { isArray } from '../tools/is-array';
import { isNumber } from '../tools/is-number';
import { pow } from '../tools/math';
import type { DeclarativeFindMultiplierOption } from './types';
import { validateMultiplier } from './validate-multiplier';

type FindMultiplierTable = Partial<Record<string, number>>;

export const defaultBase1000ParseFindItems: FindExponentItems = [
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
function transformItems(items: FindExponentItem[], base: number, unit = ''): FindMultiplierTable {

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
      const multiplier = validateMultiplier(pow(base, exp));
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
export function createFindTable(unit?: string, find?: DeclarativeFindMultiplierOption): FindMultiplierTable | null {

  // return null if no "find" option
  // TODO: once deprecated "table" option removed it should return default find table and remove null form result
  if (find == null) return null;

  // use "find" option as base if it's a number
  if (isNumber(find)) return transformItems(defaultBase1000ParseFindItems, find, unit);

  // use "find" option as items if it's an array
  if (isArray(find)) return transformItems(find, 1000, unit);

  // get items and base from "find" option
  const { find: items, base = 1000 } = find;

  // use items if items provided
  if (items) return transformItems(items, base, unit);

  // use default items
  return transformItems(defaultBase1000ParseFindItems, base, unit);

}

// TODO: once deprecated "table" option removed, call createFindTable directly and remove this function
/**
 * creates a multiplier find table from "find" and deprecated "table" options
 *
 * @param unit "unit" option
 * @param find "find" option
 * @param table deprecated "table" option
 * @returns the multiplier find table
 */
export function createFindTable_deprecated(unit?: string, find?: DeclarativeFindMultiplierOption, table?: DeprecatedTableItem[]): FindMultiplierTable {

  const findTable = createFindTable(unit, find);
  if (findTable) return findTable;

  // return default table if "table" option not provided
  if (!table) {
    return transformItems(
      defaultBase1000ParseFindItems,
      1000,
      unit,
    );
  }

  // return table based on the "table" option
  return transformItems(
    table.map(({ pre, power }) => ({ pre, exp: power })),
    10,
    unit,
  );

}
