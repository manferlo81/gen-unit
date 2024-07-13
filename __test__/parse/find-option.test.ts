import { type ParseFindMultiplierOption, MICRO, createParser } from '../../src';

describe('parse "find" option', () => {

  test('Should throw on invalid "find" option', () => {
    const invalidFindOptions = [
      true,
      false,
      '',
      'string',
    ];
    invalidFindOptions.forEach((invalid) => {
      const create = () => createParser({
        find: invalid as never,
      });
      expect(create).toThrow();
    });
  });

  test('Should use "find" option as as base if it\'s a number', () => {

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

  test('Should use "find" option as find items if it\'s an array', () => {

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

  test('Should return NaN if "find" option is an empty array', () => {

    const parse = createParser({
      find: [],
    });

    const values = [
      '1k',
    ];

    values.forEach((value) => {
      expect(parse(value)).toBeNaN();
    });

  });

  describe('"find" option as object', () => {

    test('Should throw on invalid "find" items', () => {
      const invalidItems = [
        true,
        false,
        '',
        'string',
      ];
      invalidItems.forEach((invalid) => {
        const create = () => createParser({
          find: {
            find: invalid as never,
          },
        });
        expect(create).toThrow();
      });
    });

    test('Should use "find" option as advanced options if it\'s an object', () => {

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

    test('Should use "find" option as object, using default find items', () => {

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

    test('Should use "find" option as object, using default base and find items if it\'s an empty object', () => {

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

  });

  describe('"find" options as function', () => {

    test('Should receive prefix and unit', () => {

      const find = jest.fn(() => 1);
      const parse = createParser({ unit: 'g', find });

      const values = [
        { value: '2.4mg', args: ['m', 'g'] },
        { value: '2.4m', args: ['m', 'g'] },
        { value: '3kg', args: ['k', 'g'] },
        { value: '3k', args: ['k', 'g'] },
      ];

      values.forEach(({ value, args }) => {
        parse(value);
        expect(find).toHaveBeenCalledWith(...args);
        find.mockReset();
      });

    });

    test('Should receive prefix', () => {

      const find = jest.fn(() => 1);
      const parse = createParser({ find });

      const values = [
        { value: '2.4m', args: ['m', undefined] },
        { value: '3k', args: ['k', undefined] },
      ];

      values.forEach(({ value, args }) => {
        parse(value);
        expect(find).toHaveBeenCalledWith(...args);
        find.mockReset();
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

    test('Should return NaN if find function return null', () => {

      const findFunctions = [
        () => null,
        () => { /* */ },
      ];

      findFunctions.forEach((find) => {
        const parse = createParser({ find });
        expect(parse('10 k')).toBeNaN();
      });

    });

    test('Should throw if function return invalid multiplier', () => {

      const invalidMultipliers = [
        0,
        -1000,
        NaN,
        Infinity,
        -Infinity,
        true,
        false,
      ];

      invalidMultipliers.forEach((invalid) => {

        const parse = createParser({
          find: () => invalid as never,
        });
        expect(() => parse('10 k')).toThrow('is not a valid multiplier');

      });

    });

    test('Should throw on deprecated function returning object', () => {

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

  });

  test('Should throw if "find" option result in an invalid multiplier', () => {

    const invalidFindOptions: ParseFindMultiplierOption[] = [
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

});
