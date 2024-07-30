import type { ExponentFindItems, MultiplierFindItem } from '../../src';
import { transformFindItems } from '../../src/common/transform-items';

describe('transformFindItems function', () => {

  test('Should transform find items', () => {

    const base = 10;
    const items: ExponentFindItems = [
      { pre: 'k', exp: 3 },
      { pre: 'M', exp: 6 },
      { pre: 'm', exp: -3 },
      { pre: 'u', exp: -6 },
    ];

    const transformed = transformFindItems(items, base);
    const expected = items.map<MultiplierFindItem>(({ pre, exp }) => {
      const mul = base ** exp;
      return { pre, mul };
    });

    expect(transformed.length).toBe(items.length);
    expect(transformed).toEqual(expected);

  });

});
