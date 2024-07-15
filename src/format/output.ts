import { error, errorInvalidOption } from '../common/error';
import { isFiniteNumber, isFunction, isNumber, isObject } from '../tools/is';
import type { FormatOutputFunction, FormatOutputOption } from './types';

function createOutputFormatter(space: string): FormatOutputFunction {
  return (value, pre, unit) => {
    const wholeUnit = `${pre}${unit}`;
    const spacedUnit = wholeUnit ? `${space}${wholeUnit}` : '';
    return `${value}${spacedUnit}`;
  };
}

const oneSpace = ' ';

export function createFormatOutput(output: FormatOutputOption): FormatOutputFunction {

  // return default formatter
  if (output == null) {
    return createOutputFormatter(oneSpace);
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

  if (isNumber(space)) {
    if (!isFiniteNumber(space) || space < 0) {
      throw error(`Can't format output with ${space} spaces`);
    }
    return createOutputFormatter(oneSpace.repeat(space));
  }

  // normalize space
  const normalizedSpace = space ?? oneSpace;

  // return formatter base on advanced option
  return createOutputFormatter(normalizedSpace);

}
