import { ExponentFindItems } from '../common/types';
import { noDuplicates } from '../common/no-duplicates';

export function validateParseItems(items: ExponentFindItems): ExponentFindItems {

  // validate items
  // will throw on duplicated prefix
  return noDuplicates(
    items,
    'pre',
    'prefix',
  );

}
