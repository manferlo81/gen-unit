import { isFiniteNumber } from '../tools/is';
import { error } from './error';
import type { ExponentFindItems, MultiplierFindItems } from './types';

export function transformFindItems(items: ExponentFindItems, base: number): MultiplierFindItems {
  return items.map(({ pre, exp }) => {
    const mul = base ** exp;
    if (!isFiniteNumber(mul) || mul <= 0) {
      throw error(`${base} to the power of ${exp} is not a valid multiplier`);
    }
    return { pre, mul };
  });
}
