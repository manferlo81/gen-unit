import { isFinite, isNaN } from '../tools/number';
import { capture } from './capture';
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
      return isFinite(input) ? input : NaN;
    }

    if (!input) {
      return NaN;
    }

    const asString = `${input}`;

    if (!asString) {
      return NaN;
    }

    const asNum = +asString;

    if (!isNaN(asNum)) {
      return isFinite(asNum) ? asNum : NaN;
    }

    const result = capture(asString);

    if (!result) {
      return NaN;
    }

    const [valueAsStr, unit] = result;
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
