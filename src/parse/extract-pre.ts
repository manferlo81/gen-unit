import type { ParseUnitOption } from './types';

type ExtractPrefixFunction = (wholeUnit: string) => string;

export function createExtractPre(unit: ParseUnitOption): ExtractPrefixFunction {

  if (unit) {
    return (wholeUnit) => {
      if (wholeUnit.endsWith(unit)) {
        const { length: unitLength } = unit;
        return wholeUnit.slice(0, -unitLength);
      }
      return wholeUnit;
    };
  }

  return (wholeUnit) => wholeUnit;

}
