import { FindUnitResult, FindUnitExpResult } from './formatter-types'

export function sortFindUnitArray(units: Array<FindUnitResult | FindUnitExpResult>, base: number): FindUnitResult[] {
  return units
    .map<FindUnitResult>(
      (item) => ({ pre: item.pre, div: 'exp' in item ? Math.pow(base, item.exp) : item.div }),
    )
    .sort(
      (a, b) => (b.div - a.div),
    )
}
