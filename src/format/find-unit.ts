import type { DeprecatedTableItem } from '../common/deprecated-types';
import { error } from '../common/error';
import { isFunction } from '../tools/is-function';
import { isNumber } from '../tools/is-number';
import { isFinite } from '../tools/number';
import { createFindItems_deprecated, unity } from './find-items';
import type { FindUnitFunction, FindUnitOption, FindDivisorItem } from './types';

export function createUnitFinder_deprecated(find?: FindUnitOption, deprecatedTable?: DeprecatedTableItem[]): FindUnitFunction {

  // return wrapped function if it's a function
  if (isFunction(find)) {
    return (value): FindDivisorItem => {
      const result = find(value);
      if (typeof result !== 'object') {
        throw error(`${result} is not a valid return value for "find" option`);
      }
      const { div } = result;
      if (!isNumber(div) || !div || !isFinite(div)) {
        throw error(`${div} is not a valid divider`);
      }
      return result;
    };
  }

  const findItems = createFindItems_deprecated(find, deprecatedTable);

  return (value): FindDivisorItem => {

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
