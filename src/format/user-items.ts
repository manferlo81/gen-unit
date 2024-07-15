import { noDuplicates } from '../common/no-duplicates';
import type { ExponentFindItems } from '../common/types';

export function validateFormatItems(items: ExponentFindItems): ExponentFindItems {
  const validated = noDuplicates(
    items,
    'exp',
    'exponent',
  );
  return validated.sort((a, b) => b.exp - a.exp);
}
