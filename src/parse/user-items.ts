import { noDuplicates } from '../common/no-duplicates'
import { ExponentFindItems } from '../common/types'

export function validateParseItems(items: ExponentFindItems): ExponentFindItems {

  // validate items
  // will throw on duplicated prefix
  return noDuplicates(
    items,
    'pre',
    'prefix',
  )

}
