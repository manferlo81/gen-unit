import { error, rangeError } from '../common/error';
import { createFindTable } from '../common/find-table';
import { isFiniteNumber, isFunction, isNullish, isNumber, isObject } from '../common/is';
import type { MultiplierFindItem } from '../common/types';
import { defaultBase1000FormatExpItems } from './default-items';
import type { DivisorFindItem } from './deprecated-types';
import type { FormatFindUnitFunction, FormatFindUnitOption } from './types';
import { validateFormatItems } from './user-items';

/** @deprecated */
function deprecated_handleResult(item: MultiplierFindItem | DivisorFindItem): MultiplierFindItem {

  // return item if it's modern item
  if ('mul' in item) return item;

  // use deprecated 'div' member as modern 'mul' member
  const { pre, div: mul } = item;
  return { pre, mul };

}

export function createUnitFinder(find: FormatFindUnitOption): FormatFindUnitFunction {

  // return wrapped function if option it's a function
  if (isFunction(find)) {

    return (value) => {

      // call user function
      const result = find(value);

      // return undefined if user function returns nullish
      if (isNullish(result)) return;

      // throw if user function return non-object
      if (!isObject(result)) throw error(`${result} is not a valid return value for "find" option`);

      // normalize result for deprecated result
      // get prefix and multiplier
      const { pre, mul } = deprecated_handleResult(result);

      // throw if multiplier is invalid
      if (!isNumber(mul) || !isFiniteNumber(mul) || mul <= 0) throw rangeError(`${mul} is not a valid multiplier`);

      // return prefix and multiplier
      return { pre, mul };

    };

  }

  // create table based on option
  const findTable = createFindTable(
    find,
    defaultBase1000FormatExpItems,
    validateFormatItems,
  );

  // get table array length
  const { length: itemsLength } = findTable;

  // always return null if no table items
  if (itemsLength === 0) return () => null;

  return (value) => {

    // return undefined if value equals zero
    if (value === 0) return;

    // get absolute value
    const absolute = Math.abs(value);

    // iterate through table skipping last item (smallest unit)
    const lastIndex = itemsLength - 1;
    for (let i = 0; i < lastIndex; i++) {
      const item = findTable[i];
      if (absolute >= item.mul) return item;
    }

    // return smallest unit if it couldn't be found
    return findTable[lastIndex];

  };

}
