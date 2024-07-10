import { errorInvalidOption } from '../common/error';
import { isFunction } from '../tools/is';
import type { FormatOutputFunction, FormatOutputOption } from './types';

export function createFormatOutput(output: FormatOutputOption): FormatOutputFunction {

  if (output == null) {
    return (value, pre, unit) => {
      const wholeUnit = `${pre}${unit}`;
      const spacedUnit = wholeUnit ? ` ${wholeUnit}` : '';
      return `${value}${spacedUnit}`;
    };
  }

  if (!isFunction(output)) {
    throw errorInvalidOption('output');
  }

  return output;

}
