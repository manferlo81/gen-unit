import { isNaN } from '../tools/number';
import { createMulFinder } from './find-mul';
import { CreateParserOptions, ParseFunction, ParseInput } from './types';

export function createParser(options?: CreateParserOptions): ParseFunction {

  const {
    unit,
    find,
    table: deprecatedTable,
  } = options || {} as CreateParserOptions;

  const findMul = createMulFinder(unit, find, deprecatedTable);

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

    if (valueAsNum === 0) {
      return 0;
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
