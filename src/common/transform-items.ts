import { isFiniteNumber } from './is';
import { rangeError } from './error';
import type { ExponentFindItems, MultiplierFindItems } from './types';

export function transformFindItems(items: ExponentFindItems, base: number): MultiplierFindItems {
  return items.map(({ pre, exp }) => {

    // generate multiplier
    const mul = base ** exp;

    // throw if generates an invalid multiplier
    if (!isFiniteNumber(mul) || mul <= 0) throw rangeError(`${base} to the power of ${exp} is not a valid multiplier`);

    // return multiplier item
    return { pre, mul };

  });
}
