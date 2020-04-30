import { isNaN } from '../tools/number';
import { DeprecatedTableItem } from '../types';
import { createMulFinder } from './find-mul';
import { CreateParserOptions, ParseFunction, ParseInput } from './types';

const defaultTable: DeprecatedTableItem[] = [
  { pre: 'meg', power: 6 },
  { pre: 'f', power: -15 },
  { pre: 'p', power: -12 },
  { pre: 'n', power: -9 },
  { pre: 'u', power: -6 },
  { pre: 'm', power: -3 },
  { pre: 'k', power: 3 },
  { pre: 'K', power: 3 },
  { pre: 'M', power: 6 },
  { pre: 'G', power: 9 },
  { pre: 'T', power: 12 },
];

export function createParser(options?: CreateParserOptions): ParseFunction {

  const {
    unit,
    table: deprecatedTable,
  } = options || {} as CreateParserOptions;

  const findMul = createMulFinder(deprecatedTable || defaultTable, unit);

  return (input: ParseInput): number => {

    if (typeof input === 'number') {
      return input;
    }

    const asString = `${input}`;
    const asNum = +asString;

    if (!isNaN(asNum)) {
      return asNum;
    }

    const result = /^\s*(-?[.\d]+(?:e[+-]?\d+)?)\s*(\w*)\s*$/.exec(asString);

    if (!result) {
      return NaN;
    }

    const [, valueAsStr, unit] = result;
    const valueAsNum = +valueAsStr;

    if (isNaN(valueAsNum)) {
      return NaN;
    }

    const mul = findMul(unit);

    if (isNaN(mul)) {
      return NaN;
    }

    return valueAsNum * mul;

  };

}

export function parse(input: ParseInput, options?: CreateParserOptions): number {
  return createParser(options)(input);
}
