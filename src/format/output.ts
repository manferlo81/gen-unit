import { errorInvalidOption } from '../common/error';
import { isFunction, isObject } from '../tools/is';
import type { FormatOutputFunction, FormatOutputOption } from './types';

function createOutputFormatter(space: string): FormatOutputFunction {
  return (value, pre, unit) => {
    const wholeUnit = `${pre}${unit}`;
    const spacedUnit = wholeUnit ? `${space}${wholeUnit}` : '';
    return `${value}${spacedUnit}`;
  };
}

export function createFormatOutput(output: FormatOutputOption): FormatOutputFunction {

  // return default formatter
  if (output == null) {
    return createOutputFormatter(' ');
  }

  // return option if it's a function
  if (isFunction(output)) {
    return output;
  }

  // throw if option is not an object at this point
  if (!isObject(output)) {
    throw errorInvalidOption('output');
  }

  // get sub-options
  const { space } = output;

  // normalize space
  const normalizedSpace = space ?? ' ';

  // return formatter base on advanced option
  return createOutputFormatter(normalizedSpace);

}
