import { isFunction } from '../tools/is-function';
import type { FormatOutputFunction } from './types';

export function createFormatOutput(output?: FormatOutputFunction): FormatOutputFunction {

  if (isFunction(output)) {
    return output;
  }

  return (value: string | number, pre: string, unit: string): string => {
    const wholeUnit = `${pre}${unit}`;
    const spacedUnit = wholeUnit ? ` ${wholeUnit}` : '';
    return `${value}${spacedUnit}`;
  };

}
