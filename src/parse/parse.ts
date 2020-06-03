import { isNumber } from '../tools/is-number';
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

    if (isNumber(input)) {
      return isFinite(input) ? input : NaN;
    }

    if (!input) {
      return NaN;
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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

    if (!valueAsNum) {
      return valueAsNum === 0 ? 0 : NaN;
    }

    const mul = findMul(unit);

    if (!mul) {
      return NaN;
    }

    const { mul: mul2 } = mul;

    return mul2 ? valueAsNum * mul2 : NaN;

  };

}

export function parse(input: ParseInput, options?: CreateParserOptions): number {
  return createParser(options)(input);
}
