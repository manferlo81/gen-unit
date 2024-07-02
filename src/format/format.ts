import { isFunction } from '../tools/is-function';
import { isNumber } from '../tools/is-number';
import { createUnitFinder } from './find-unit';
import { createRounder } from './round';
import { type CreateFormatterOptions, type FormatFunction, type FormatOutputFunction, type RoundFunction } from './types';

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

  const getUnit = isFunction(unit) ? unit : (): string => (unit ?? '');

  const findUnit = createUnitFinder(find, deprecatedTable);

  const roundNum = isFunction<RoundFunction>(round)
    ? round
    : createRounder(
      isNumber(round)
        ? { dec: round }
        : (round ?? { dec: deprecatedDec, fixed: deprecatedFixed }),
    );

  const formatOutput = isFunction<FormatOutputFunction>(output)
    ? output
    : (value: string | number, pre: string, unit: string): string => {
      const wholeUnit = `${pre}${unit}`;
      return `${value as string}${wholeUnit ? ` ${wholeUnit}` : ''}`;
    };

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

export function format(value: number, options?: CreateFormatterOptions): string {
  return createFormatter(options)(value);
}
