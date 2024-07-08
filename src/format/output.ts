import { errorInvalidOption } from '../common/error';
import type { AllowNullish } from '../tools/helper-types';
import { isFunction } from '../tools/is';
import type { FormatOutputFunction } from './types';

export function createFormatOutput(output: AllowNullish<FormatOutputFunction>): FormatOutputFunction {

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
