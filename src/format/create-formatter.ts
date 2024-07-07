import { errorRemoved } from '../common/error';
import { isFunction } from '../tools/is';
import { createUnitFinder } from './find-unit';
import { createFormatOutput } from './output';
import { createRounder } from './round';
import type { CreateFormatterOptions, FormatFunction, GetUnitFunction } from './types';

export function createFormatter(options: CreateFormatterOptions = {}): FormatFunction {

  if ('table' in options) {
    throw errorRemoved('table', 'find');
  }

  if ('dec' in options) {
    throw errorRemoved('dec', 'round');
  }

  if ('fixed' in options) {
    throw errorRemoved('fixed', 'round');
  }

  const {
    unit,
    find,
    round,
    output,
  } = options;

  const getUnit: GetUnitFunction = isFunction(unit) ? unit : (): string => (unit ?? '');
  const findUnit = createUnitFinder(find);
  const roundNum = createRounder(round);
  const formatOutput = createFormatOutput(output);

  return (value: number): string => {
    const unitObj = findUnit(value);
    const { pre, div: divisor } = unitObj;
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
