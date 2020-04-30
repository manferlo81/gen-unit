import { createUnitFinder2 } from './create-unit-finder'
import { FindUnitExpResult, FindUnitFunction } from './formatter-types'
import { TableItem } from './types'

export function createLegacyUnitFinder(table: TableItem[]): FindUnitFunction {
  return createUnitFinder2({
    base: 10,
    find: table.map<FindUnitExpResult>(({ pre, power }) => ({ pre, exp: power })),
  })
}
