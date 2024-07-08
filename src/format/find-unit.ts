import { error } from '../common/error';
import { isFinite, isFunction, isNumber, isObject } from '../tools/is';
import { createFindItems, unity } from './find-items';
import type { DivisorFindItem, FormatFindUnitFunction, FormatFindUnitOption } from './types';

export function createUnitFinder(find?: FormatFindUnitOption): FormatFindUnitFunction {

  // return wrapped function if it's a function
  if (isFunction(find)) {
    return (value): DivisorFindItem => {
      const result = find(value);
      if (!isObject(result)) {
        throw error(`${result} is not a valid return value for "find" option`);
      }
      const { div } = result;
      if (!isNumber(div) || !div || !isFinite(div)) {
        throw error(`${div} is not a valid divider`);
      }
      return result;
    };
  }

  const findItems = createFindItems(find);

  return (value): DivisorFindItem => {

    if (!value) {
      return unity;
    }

    const val = Math.abs(value);

    const lastIndex = findItems.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      const obj = findItems[i];
      if (val >= obj.div) {
        return obj;
      }
    }

    return lastIndex >= 0 ? findItems[lastIndex] : unity;

  };

}
