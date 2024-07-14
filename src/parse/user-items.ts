import { error } from '../common/error';
import { ExponentFindItems } from '../common/types';

export function validateParseItems(items: ExponentFindItems): ExponentFindItems {

  const length = items.length;
  if (length < 2) return items;

  const lastItemIndex = length - 1;
  const beforeLastItemIndex = lastItemIndex - 1;

  for (let i = 0; i <= beforeLastItemIndex; i++) {
    const pre = items[i].pre;
    for (let j = i + 1; j <= lastItemIndex; j++) {
      if (items[j].pre === pre) {
        throw error(`Duplicated prefix (${pre})`);
      }
    }
  }

  return items;

}
