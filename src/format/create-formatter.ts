import { errorOptionRemoved } from '../common/error';
import { isFunction } from '../tools/is';
import { createUnitFinder } from './find-unit';
import { createFormatOutput } from './output';
import { createRounder } from './round';
import type { CreateFormatterOptions, Formatter, FormatGetUnitFunction } from './types';

/**
 * Create a new formatter
 *
 * @param options create formatter options
 * @returns formatter
 */
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

  const getUnit: FormatGetUnitFunction = isFunction(unit) ? unit : (): string => (unit ?? '');
  const findUnit = createUnitFinder(find);
  const roundNum = createRounder(round);
  const formatOutput = createFormatOutput(output);

  return (value: number): string => {
    const item = findUnit(value);
    const { pre, div: divisor } = item;
    const divided = value / divisor;
    const rounded = roundNum(divided);
    const result = formatOutput(
      rounded,
      pre,
      getUnit(divided, rounded, pre),
    );
    return `${result}`;
  };

}
