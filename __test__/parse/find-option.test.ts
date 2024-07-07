import { type FindMultiplierOption, MICRO, createParser } from '../../src';

describe('parse "find" option', () => {

  test('Should use "find" option as number', () => {

    const base = 1024;
    const parse = createParser({
      find: base,
    });

    const values = [
      { value: '1.2m', expected: 1.2 * base ** -1 },
      { value: '1.2k', expected: 1.2 * 1024 },
      { value: '1.2M', expected: 1.2 * 1024 ** 2 },
      { value: '1.2G', expected: 1.2 * 1024 ** 3 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

  test('Should use "find" option as array', () => {

    const parse = createParser({
      find: [
        { pre: 'k', exp: 1 },
        { pre: 'm', exp: -1 },
      ],
    });

    const values = [
      { value: '1.2k', expected: 1.2 * 1000 ** 1 },
      { value: '1.2m', expected: 1.2 * 1000 ** -1 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

  test('Should use "find" option as object', () => {

    const base = 1024;
    const parse = createParser({
      find: {
        base,
        find: [
          { pre: 'k', exp: 1 },
          { pre: 'm', exp: -1 },
        ],
      },
    });

    const values = [
      { value: '1.2k', expected: 1.2 * base ** 1 },
      { value: '1.2m', expected: 1.2 * base ** -1 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

  test('Should use "find" option as object, using default units', () => {

    const base = 1024;
    const parse = createParser({
      find: { base },
    });

    const values = [
      { value: '1.2f', expected: 1.2 * base ** -5 },
      { value: '1.2p', expected: 1.2 * base ** -4 },
      { value: '1.2n', expected: 1.2 * base ** -3 },
      { value: '1.2u', expected: 1.2 * base ** -2 },
      { value: `1.2${MICRO}`, expected: 1.2 * base ** -2 },
      { value: '1.2m', expected: 1.2 * base ** -1 },
      { value: '1.2', expected: 1.2 },
      { value: '1.2k', expected: 1.2 * base },
      { value: '1.2K', expected: 1.2 * base },
      { value: '1.2meg', expected: 1.2 * base ** 2 },
      { value: '1.2M', expected: 1.2 * base ** 2 },
      { value: '1.2G', expected: 1.2 * base ** 3 },
      { value: '1.2T', expected: 1.2 * base ** 4 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

  test('Should use "find" option as object, using default base 1000', () => {

    const parse = createParser({
      find: {
        find: [
          { pre: 'k', exp: 1 },
          { pre: 'm', exp: -1 },
        ],
      },
    });

    const values = [
      { value: '1.2k', expected: 1.2 * 1000 },
      { value: '1.2', expected: 1.2 },
      { value: '1.2m', expected: 1.2 / 1000 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

  test('Should use default base and items if empty object passed', () => {

    const parse = createParser({
      find: {},
    });

    const values = [
      { value: '1.2f', expected: 1.2 * 1000 ** -5 },
      { value: '1.2p', expected: 1.2 * 1000 ** -4 },
      { value: '1.2n', expected: 1.2 * 1000 ** -3 },
      { value: '1.2u', expected: 1.2 * 1000 ** -2 },
      { value: `1.2${MICRO}`, expected: 1.2 * 1000 ** -2 },
      { value: '1.2m', expected: 1.2 * 1000 ** -1 },
      { value: '1.2', expected: 1.2 },
      { value: '1.2k', expected: 1.2 * 1000 },
      { value: '1.2K', expected: 1.2 * 1000 },
      { value: '1.2meg', expected: 1.2 * 1000 ** 2 },
      { value: '1.2M', expected: 1.2 * 1000 ** 2 },
      { value: '1.2G', expected: 1.2 * 1000 ** 3 },
      { value: '1.2T', expected: 1.2 * 1000 ** 4 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

  test('Should use "find" option as function returning number', () => {

    const parse = createParser({
      find: (unit) => unit === 'k' ? 1000 : null,
    });

    const values = [
      { value: '1.2k', expected: 1.2e3 },
      { value: '3.1k', expected: 3.1e3 },
      { value: '3.1', expected: 3.1 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

    expect(parse('4.2m')).toBeNaN();

  });

  test('Should throw if "find" option result in an invalid multiplier', () => {

    const invalidFindOptions: FindMultiplierOption[] = [
      0,
      { base: 0 },
      NaN,
      [{ pre: 'k', exp: NaN }],
      { base: NaN },
      { find: [{ pre: 'k', exp: NaN }] },
    ];

    invalidFindOptions.forEach((options) => {
      expect(() => createParser({ find: options })).toThrow('is not a valid multiplier');
    });

  });

  test('Should throw on invalid multiplier', () => {

    const invalidMultipliers = [
      true,
      false,
    ];

    invalidMultipliers.forEach((invalid) => {

      const parse = createParser({
        find: () => invalid as never,
      });

      expect(() => parse('10 k')).toThrow('Function should return');

    });

  });

  test('Should throw on function returning object', () => {

    const values = [
      {},
      { mul: 10 },
    ];

    values.forEach((value) => {

      const parse = createParser({
        find: () => value as never,
      });

      expect(() => parse('10 k')).toThrow('Function returning object is no longer supported');

    });

  });

  test('Should throw if function return invalid multiplier', () => {

    const invalidMultipliers = [
      0,
      NaN,
      -1,
      Infinity,
      -Infinity,
    ];

    invalidMultipliers.forEach((invalid) => {

      const parse = createParser({
        find: () => invalid,
      });
      expect(() => parse('10 k')).toThrow('is not a valid multiplier');

    });

  });

  test('Should return NaN if multiplier is null', () => {

    const parse = createParser({
      find: () => null,
    });

    expect(parse('10 k')).toBeNaN();

  });

});
