import { error } from '../common/error';
import type { ExponentFindItems } from '../common/types';

function sortItems(items: ExponentFindItems): ExponentFindItems {
  return items.sort((a, b) => b.exp - a.exp);
}

export function validateFormatItems(items: ExponentFindItems): ExponentFindItems {

  const { length } = items;
  if (length < 2) return sortItems(items);

  for (let a = 0; a < length - 1; a++) {
    const exp = items[a].exp;
    for (let b = a + 1; b < length; b++) {
      if (items[b].exp === exp) {
        throw error(`Duplicated exponent (${exp})`);
      }
    }
  }

  return sortItems(items);

}
