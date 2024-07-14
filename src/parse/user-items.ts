import { error } from '../common/error';
import { ExponentFindItems } from '../common/types';

export function validateParseItems(items: ExponentFindItems): ExponentFindItems {

  const length = items.length;
  if (length < 2) return items;

  for (let a = 0; a < length - 1; a++) {
    const pre = items[a].pre;
    for (let b = a + 1; b < length; b++) {
      if (items[b].pre === pre) {
        throw error(`Duplicated prefix (${pre})`);
      }
    }
  }

  return items;

}
