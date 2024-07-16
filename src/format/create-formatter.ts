import { errorOptionRemoved } from '../common/error';
import { isFiniteNumber, isFunction } from '../common/is';
import type { DeprecatedFormatGetUnitFunction } from './deprecated-types';
import { createUnitFinder } from './find-unit';
import { createFormatOutput } from './output';
import { createRounder } from './round';
import type { CreateFormatterOptions, CreateFormatterOptionsWithoutUnit, CreateFormatterOptionsWithUnit, Formatter, FormatUnitOption } from './types';

/**
 * Create a new formatter
 *
 * @param options create formatter options
 * @returns formatter
 */
export function createFormatter<U extends FormatUnitOption>(options: CreateFormatterOptionsWithUnit<U>): Formatter;
export function createFormatter(options: CreateFormatterOptionsWithoutUnit): Formatter;
export function createFormatter(options?: CreateFormatterOptions): Formatter;
export function createFormatter(options: CreateFormatterOptions = {}): Formatter {

  if ('table' in options) {
    throw errorOptionRemoved('table', 'find');
  }

  if ('dec' in options) {
    throw errorOptionRemoved('dec', 'round');
  }

  if ('fixed' in options) {
    throw errorOptionRemoved('fixed', 'round');
  }

  const {
    unit,
    find,
    round,
    output,
  } = options;

  const getUnit: DeprecatedFormatGetUnitFunction = isFunction(unit) ? unit : (): string => unit ?? '';
  const findUnit = createUnitFinder(find);
  const roundNum = createRounder(round);
  const formatOutput = createFormatOutput(output);

  return (value: number): string => {
    if (!isFiniteNumber(value)) {
      return `${value}`;
    }
    const item = findUnit(value);
    const { pre, mul: divisor } = item;
    const divided = value / divisor;
    const rounded = roundNum(divided);
    const computedUnit = getUnit(divided, rounded, pre);
    const result = formatOutput(
      rounded,
      pre,
      computedUnit,
    );
    return `${result as unknown}`;
  };

}
