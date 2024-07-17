import { errorInvalidOption, rangeError } from '../common/error';
import { isFiniteNumber, isFunction, isNullish, isNumber, isObject } from '../common/is';
import type { FormatOutputFunction, FormatOutputOption } from './types';

function createFormatterFromOptions(space: string): FormatOutputFunction {
  return (value, pre, unit) => {
    const wholeUnit = `${pre}${unit}`;
    const spacedUnit = wholeUnit ? `${space}${wholeUnit}` : '';
    return `${value}${spacedUnit}`;
  };
}

const oneSpace = ' ';

export function createOutputFormatter(output: FormatOutputOption): FormatOutputFunction {

  // return default formatter
  if (isNullish(output)) return createFormatterFromOptions(oneSpace);

  // return wrapped function if it's a function to ensure it returns a string
  if (isFunction(output)) {
    return (value, pre, unit) => {

      // call user function
      const formatted = output(value, pre, unit);

      // return user function result as string
      return `${formatted as unknown}`;

    };
  }

  // throw if option is not an object at this point
  if (!isObject(output)) throw errorInvalidOption('output');

  // get option members
  const { space } = output;

  // if space member is a number
  if (isNumber(space)) {

    // throw if it's invalid number of spaces
    if (!isFiniteNumber(space) || space < 0) throw rangeError(`Can't format output with ${space} spaces`);

    // return formatter with given number of spaces
    const spaceString = oneSpace.repeat(space);
    return createFormatterFromOptions(spaceString);

  }

  // normalize space
  const normalizedSpace = space ?? oneSpace;

  // return formatter base on advanced options
  return createFormatterFromOptions(normalizedSpace);

}
