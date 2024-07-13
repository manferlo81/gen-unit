import { error } from '../common/error';
import { MultiplierFindItem } from '../common/types';
import { isFiniteNumber, isFunction, isNumber, isObject } from '../tools/is';
import { DivisorFindItem } from './deprecated-types';
import { createFindItems, unity } from './find-items';
import type { FormatFindUnitFunction, FormatFindUnitOption } from './types';

function handleDeprecatedResult(result: MultiplierFindItem | DivisorFindItem): MultiplierFindItem {
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

      const { pre, mul } = handleDeprecatedResult(result);

      if (!isNumber(mul) || !isFiniteNumber(mul) || mul <= 0) {
        throw error(`${mul} is not a valid multiplier`);
      }

      return { pre, mul };

    };

  }

  const findItems = createFindItems(find);
  const { length: itemsLength } = findItems;

  if (itemsLength === 0) {
    return () => unity;
  }

  return (value) => {

    if (!value) {
      return unity;
    }

    const absolute = Math.abs(value);

    const lastIndex = itemsLength - 1;
    for (let i = 0; i < lastIndex; i++) {
      const item = findItems[i];
      if (absolute >= item.mul) {
        return item;
      }
    }

    return findItems[lastIndex];

  };

}
