import { noDuplicates } from '../common/no-duplicates';
import type { ExponentFindItems } from '../common/types';

export function validateFormatItems(items: ExponentFindItems): ExponentFindItems {

  // validate items
  // will throw on duplicated exponent
  const validated = noDuplicates(
    items,
    'exp',
    'exponent',
  );

  // return sorted items
  return validated.sort((a, b) => b.exp - a.exp);

}
