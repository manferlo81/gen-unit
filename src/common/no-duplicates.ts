import { error } from './error';
import type { ExponentFindItem, ExponentFindItems } from './types';

export function noDuplicates(items: ExponentFindItems, key: keyof ExponentFindItem, str: string): ExponentFindItems {

  const { length } = items;

  for (let i1 = 0; i1 < length - 1; i1++) {
    const iut = items[i1][key];
    for (let i2 = i1 + 1; i2 < length; i2++) {
      if (items[i2][key] === iut) throw error(`Duplicated ${str} (${iut})`);
    }
  }

  return items;

}
