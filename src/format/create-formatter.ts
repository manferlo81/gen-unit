import { errorRemoved } from '../common/error';
import { isFunction } from '../tools/is-function';
import { createUnitFinder } from './find-unit';
import { createFormatOutput } from './output';
import { createRounder_deprecated } from './round';
import type { CreateFormatterOptions, FormatFunction, GetUnitFunction } from './types';

export function createFormatter(options: CreateFormatterOptions = {}): FormatFunction {

  if ('table' in options) {
    throw errorRemoved('table', 'find');
  }

  const {
    unit,
    find,
    round,
    output,
    dec: deprecatedDec,
    fixed: deprecatedFixed,
  } = options;

  const getUnit: GetUnitFunction = isFunction(unit) ? unit : (): string => (unit ?? '');
  const findUnit = createUnitFinder(find);
  const roundNum = createRounder_deprecated(round, deprecatedDec, deprecatedFixed);
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
