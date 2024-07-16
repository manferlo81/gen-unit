import { error, rangeError } from '../common/error';
import { createFindTable } from '../common/find-table';
import type { MultiplierFindItem } from '../common/types';
import { isFiniteNumber, isFunction, isNumber, isObject } from '../common/is';
import { defaultBase1000FormatExpItems, unity } from './default-items';
import type { DivisorFindItem } from './deprecated-types';
import { validateFormatItems } from './user-items';
import type { FormatFindUnitFunction, FormatFindUnitOption } from './types';

function deprecated_handleResult(result: MultiplierFindItem | DivisorFindItem): MultiplierFindItem {
  if ('mul' in result) {
    return result;
  }
  const { pre, div: mul } = result;
  return { pre, mul };
}

export function createUnitFinder(find: FormatFindUnitOption): FormatFindUnitFunction {

  // return wrapped function if it's a function
  if (isFunction(find)) {

    return (value) => {

      const result = find(value);

      if (!isObject(result)) {
        throw error(`${result} is not a valid return value for "find" option`);
      }

      const { pre, mul } = deprecated_handleResult(result);

      if (!isNumber(mul) || !isFiniteNumber(mul) || mul <= 0) {
        throw rangeError(`${mul} is not a valid multiplier`);
      }

      return { pre, mul };

    };

  }

  const findTable = createFindTable(
    find,
    defaultBase1000FormatExpItems,
    validateFormatItems,
  );

  const { length: itemsLength } = findTable;

  if (itemsLength === 0) {
    return () => unity;
  }

  return (value) => {

    if (value === 0) {
      return unity;
    }

    const absolute = Math.abs(value);

    const lastIndex = itemsLength - 1;
    for (let i = 0; i < lastIndex; i++) {
      const item = findTable[i];
      if (absolute >= item.mul) {
        return item;
      }
    }

    return findTable[lastIndex];

  };

}
