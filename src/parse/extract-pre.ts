import type { ParseUnitOption } from './types';

type ExtractPreFunction = (wholeUnit: string) => string;

/**
 * Create a extractPre function
 *
 * @param unit parser "unit" options
 * @returns extractPre function
 */
export function createExtractPre(unit: ParseUnitOption): ExtractPreFunction {

  if (unit) {
    return (wholeUnit) => {
      if (wholeUnit.endsWith(unit)) {
        const unitLength = unit.length;
        return wholeUnit.slice(0, -unitLength);
      }
      return wholeUnit;
    };
  }

  return (wholeUnit) => wholeUnit;

}
