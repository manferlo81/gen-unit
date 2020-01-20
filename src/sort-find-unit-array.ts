import { FindUnitResult } from './formatter-types'

export function sortFindUnitArray(units: FindUnitResult[]): FindUnitResult[] {
  return units.sort((a, b) => (b.div - a.div))
}
