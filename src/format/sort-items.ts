import type { ExponentFindItems } from '../common/types';

export function sortFormatExponentItems(units: ExponentFindItems): ExponentFindItems {
  return units.sort((a, b) => b.exp - a.exp);
}
