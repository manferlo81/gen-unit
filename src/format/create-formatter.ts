import { isFunction } from '../tools/is-function';
import { createUnitFinder_deprecated } from './find-unit';
import { createFormatOutput } from './output';
import { createRounder_deprecated } from './round';
import type { CreateFormatterOptions, FormatFunction, GetUnitFunction } from './types';

export function createFormatter(options: CreateFormatterOptions = {}): FormatFunction {

  const {
    unit,
    find,
    round,
    output,
    dec: deprecatedDec,
    fixed: deprecatedFixed,
    table: deprecatedTable,
  } = options;

  const getUnit: GetUnitFunction = isFunction(unit) ? unit : (): string => (unit ?? '');
  const findUnit = createUnitFinder_deprecated(find, deprecatedTable);
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
