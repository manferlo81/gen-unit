import { FindUnitResult } from './formatter-types'

function sortFindUnitArray(units: FindUnitResult[]): FindUnitResult[] {
  return units.sort((a, b) => (b.div - a.div))
}

export default sortFindUnitArray
