import type { ParseUnitOption } from './types';

type ExtractPrefixFunction = (wholeUnit: string) => string;

export function createExtractPre(unit: ParseUnitOption): ExtractPrefixFunction {

  if (unit) return (wholeUnit) => {

    // return prefix if whole unit ends with unit
    if (wholeUnit.endsWith(unit)) {
      const { length: unitLength } = unit;
      return wholeUnit.slice(0, -unitLength);
    }

    // return whole unit as prefix
    return wholeUnit;

  };

  // return whole unit as prefix
  return (wholeUnit) => wholeUnit;

}
