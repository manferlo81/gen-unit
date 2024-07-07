import { error } from '../common/error';
import { isFunction } from '../tools/is';
import type { FormatOutputFunction } from './types';

function defaultFormatOutput(value: string | number, pre: string, unit: string): string {
  const wholeUnit = `${pre}${unit}`;
  const spacedUnit = wholeUnit ? ` ${wholeUnit}` : '';
  return `${value}${spacedUnit}`;
}

export function createFormatOutput(output?: FormatOutputFunction): FormatOutputFunction {

  if (output == null) {
    return defaultFormatOutput;
  }

  if (!isFunction(output)) {
    throw error('Invalid "output" option.');
  }

  return output;

}
