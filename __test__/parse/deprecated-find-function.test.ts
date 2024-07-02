import { createParser } from '../../src';

describe('deprecated "find" function', () => {

  test('Should use "find" option as function returning object', () => {

    const parse = createParser({
      find: (unit) => (unit === 'k' ? { mul: 1000 } : null),
    });

    const values = [
      { value: '1.2k', expected: 1.2 * 1000 },
      { value: '3.1k', expected: 3.1 * 1000 },
      { value: '3.1', expected: 3.1 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

    expect(parse('4.2m')).toBeNaN();

  });

  test('Should use "find" option as function returning object with NaN', () => {

    const parse = createParser({
      find: () => ({ mul: NaN }),
    });

    const values = [
      '1.2k',
      '3.1k',
      '4.2m',
    ];

    values.forEach((value) => {
      expect(() => parse(value)).toThrow('multiplier is NaN');
    });

  });

  test('Should throw on invalid multiplier object', () => {

    const values = [
      { mul: true },
      { mul: false },
    ];

    values.forEach((value) => {

      const parse = createParser({
        find: () => value as never,
      });

      expect(() => parse('10 k')).toThrow('is not a valid multiplier');

    });

  });

  test('Should throw on zero as multiplier', () => {

    const parse = createParser({
      find: () => ({ mul: 0 }),
    });

    expect(() => parse('10 k')).toThrow('Multiplier can\'t be zero');

  });

  test('Should return NaN if multiplier is null', () => {

    const parse = createParser({
      find: () => ({ mul: null }),
    });

    expect(parse('10 k')).toBeNaN();

  });

});
