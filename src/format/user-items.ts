import type { ExponentFindItems } from '../common/types';

export function validateFormatItems(items: ExponentFindItems): ExponentFindItems {
  return items.sort((a, b) => b.exp - a.exp);
}
