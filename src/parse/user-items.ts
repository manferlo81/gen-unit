import { ExponentFindItems } from '../common/types';
import { noDuplicates } from '../common/no-duplicates';

export function validateParseItems(items: ExponentFindItems): ExponentFindItems {
  return noDuplicates(
    items,
    'pre',
    'prefix',
  );
}
