import { pow } from '../tools/math';
import { DeprecatedTableItem } from '../types';
import { FindMultiplierFunction } from './types';

export function createMulFinder(table: DeprecatedTableItem[], unit?: string): FindMultiplierFunction {

  if (!unit) {

    return (capturedUnit: string): number => {

      for (let i = 0, len = table.length; i < len; i++) {
        const obj = table[i];
        if (capturedUnit === obj.pre) {
          return pow(10, obj.power);
        }
      }

      return NaN;

    };

  }

  return (capturedUnit: string): number => {

    if (capturedUnit === unit) {
      return 1;
    }

    for (let i = 0, len = table.length; i < len; i++) {
      const obj = table[i];
      if (capturedUnit === obj.pre || capturedUnit === `${obj.pre}${unit}`) {
        return pow(10, obj.power);
      }
    }

    return NaN;

  };

}
