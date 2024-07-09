import type { AllowNullish } from '../tools/helper-types';

type ExtractPreFunction = (wholeUnit: string) => string;

export function createExtractPre(unit: AllowNullish<string>): ExtractPreFunction {

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
