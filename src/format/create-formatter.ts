import { errorOptionRemoved } from '../common/error';
import { isFiniteNumber, isFunction, isNullish } from '../common/is';
import type { DeprecatedFormatGetUnitFunction } from '../deprecated-types';
import { createUnitFinder } from './find-unit';
import { createOutputFormatter } from './output';
import { createRounder } from './round';
import type { CreateFormatterOptions, CreateFormatterOptionsWithoutUnit, CreateFormatterOptionsWithUnit, Formatter, FormatUnitOption } from './types';

/** @deprecated */
function deprecated_createGetUnit(unit: FormatUnitOption | DeprecatedFormatGetUnitFunction): DeprecatedFormatGetUnitFunction {

  // return unit option if it's a function (deprecated)
  if (isFunction(unit)) return unit;

  // return a function returning normalized unit
  const normalizedUnit = unit ?? '';
  return () => normalizedUnit;

}

/**
 * Create a formatter function
 *
 * @param options create formatter options
 */
export function createFormatter<U extends FormatUnitOption>(options: CreateFormatterOptionsWithUnit<U>): Formatter;
export function createFormatter(options: CreateFormatterOptionsWithoutUnit): Formatter;
export function createFormatter(options?: CreateFormatterOptions): Formatter;
export function createFormatter(options: CreateFormatterOptions = {}): Formatter {

  // TODO: remove in the future
  // option removed in version 0.1.0
  // throw if removed table option present
  if ('table' in options) throw errorOptionRemoved('table', 'find');

  // TODO: remove in the future
  // option removed in version 0.1.0
  // throw if removed dec option present
  if ('dec' in options) throw errorOptionRemoved('dec', 'round');

  // TODO: remove in the future
  // option removed in version 0.1.0
  // throw if removed fixed option present
  if ('fixed' in options) throw errorOptionRemoved('fixed', 'round');

  const {
    unit,
    find,
    round,
    output,
  } = options;

  const getUnit = deprecated_createGetUnit(unit);
  const findUnit = createUnitFinder(find);
  const roundNum = createRounder(round);
  const formatOutput = createOutputFormatter(output);

  const formatWithPre = (value: number, pre: string) => {
    const rounded = roundNum(value);
    const computedUnit = getUnit(value, rounded, pre);
    return formatOutput(
      rounded,
      pre,
      computedUnit,
    );
  };

  return (value: number): string => {

    // return value as string if it's not finite
    if (!isFiniteNumber(value)) return `${value}`;

    // find unit
    const item = findUnit(value);

    // return formatted value * 1 if can't find prefix and multiplier
    if (isNullish(item)) return formatWithPre(value, '');

    // get prefix and multiplier
    const { pre, mul: divisor } = item;

    // return formatted value
    return formatWithPre(value / divisor, pre);

  };

}
