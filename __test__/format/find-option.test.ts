import { createFormatter, ExponentFindItems, format, MICRO } from '../../src';

describe('format "find" option', () => {

  test('Should throw on invalid "find" option', () => {

    const invalidFindOptions = [
      true,
      false,
      '',
      'string',
    ];

    invalidFindOptions.forEach((invalid) => {
      const create = () => createFormatter({
        find: invalid as never,
      });
      expect(create).toThrow('Invalid "find" option');
    });

  });

  test('Should use default units with base 1000', () => {

    const format = createFormatter();

    const values = [
      { value: 0, expected: '0' },
      { value: 0.5, expected: '500 m' },
      { value: 500, expected: '500' },
      { value: 12e12, expected: '12 T' },
      { value: 12e9, expected: '12 G' },
      { value: 12e6, expected: '12 M' },
      { value: 12e3, expected: '12 k' },
      { value: 12, expected: '12' },
      { value: 12e-3, expected: '12 m' },
      { value: 12e-6, expected: '12 \xb5' },
      { value: 12e-9, expected: '12 n' },
      { value: 12e-12, expected: '12 p' },
      { value: 12e-15, expected: '12 f' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected);
    });

  });

  describe('"find" option as number', () => {

    test('Should use "find" option as number', () => {

      const base = 1024;
      const format = createFormatter({
        find: base,
      });

      const values = [
        { value: 0, expected: '0' },
        { value: 0.5, expected: '512 m' },
        { value: 500, expected: '500' },
        { value: 1.2 * base ** 4, expected: '1.2 T' },
        { value: 1.2 * base ** 3, expected: '1.2 G' },
        { value: 1.2 * base ** 2, expected: '1.2 M' },
        { value: 1.2 * base ** 1, expected: '1.2 k' },
        { value: 1.2 * base ** 0, expected: '1.2' },
        { value: 1.2 * base ** -1, expected: '1.2 m' },
        { value: 1.2 * base ** -2, expected: `1.2 ${MICRO}` },
        { value: 1.2 * base ** -3, expected: '1.2 n' },
        { value: 1.2 * base ** -4, expected: '1.2 p' },
        { value: 1.2 * base ** -5, expected: '1.2 f' },
      ];

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

  });

  describe('"find" option as array', () => {

    test('Should throw if items has duplicates', () => {

      const itemsWithDuplicates: ExponentFindItems[] = [
        [
          { pre: 'k', exp: 1 },
          { pre: 'K', exp: 1 },
        ],
        [
          { pre: 'k', exp: 1 },
          { pre: 'K', exp: 1 },
          { pre: 'M', exp: 2 },
          { pre: 'G', exp: 3 },
        ],
        [
          { pre: '', exp: 0 },
          { pre: 'k', exp: 1 },
          { pre: 'K', exp: 1 },
          { pre: 'M', exp: 2 },
        ],
        [
          { pre: 'm', exp: -1 },
          { pre: '', exp: 0 },
          { pre: 'k', exp: 1 },
          { pre: 'K', exp: 1 },
        ],
      ];

      itemsWithDuplicates.forEach((find) => {
        const create = () => createFormatter({ find });
        expect(create).toThrow('Duplicated exponent');
      });

    });

    test('Should use "find" option as array of exponents with base 1000', () => {

      const format = createFormatter({
        find: [
          { pre: 'm', exp: -1 },
          { pre: 'k', exp: 1 },
          { pre: '', exp: 0 },
        ],
      });

      const values = [
        { value: 0, expected: '0' },
        { value: 3, expected: '3' },
        { value: 30e3, expected: '30 k' },
        { value: 30e6, expected: '30000 k' },
        { value: 30e-3, expected: '30 m' },
        { value: 30e-6, expected: '0.03 m' },
      ];

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

    test('Should default to unity if array empty', () => {

      const format = createFormatter({
        find: [],
      });

      expect(format(100)).toBe('100');

    });

  });

  describe('"find" option as object', () => {

    test('Should throw if invalid items provided', () => {

      const invalid = [
        true,
        false,
        '',
        'string',
      ];

      invalid.forEach((invalid) => {
        const create = () => createFormatter({
          find: {
            base: 1000,
            items: invalid as never,
          },
        });
        expect(create).toThrow('Invalid "find" option');
      });

    });

    test('Should use "find" option as object', () => {

      const format = createFormatter({
        find: {
          base: 10,
          items: [
            { pre: 'm', exp: -3 },
            { pre: 'k', exp: 3 },
            { pre: '', exp: 0 },
          ],
        },
      });

      const values = [
        { value: 0, expected: '0' },
        { value: 3, expected: '3' },
        { value: 30e3, expected: '30 k' },
        { value: 30e6, expected: '30000 k' },
        { value: 30e-3, expected: '30 m' },
        { value: 30e-6, expected: '0.03 m' },
      ];

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

    test('Should default to base 1000', () => {

      const format = createFormatter({
        find: {
          items: [
            { pre: 'm', exp: -1 },
            { pre: 'k', exp: 1 },
            { pre: '', exp: 0 },
          ],
        },
      });

      const values = [
        { value: 0, expected: '0' },
        { value: 3, expected: '3' },
        { value: 30e3, expected: '30 k' },
        { value: 30e6, expected: '30000 k' },
        { value: 30e-3, expected: '30 m' },
        { value: 30e-6, expected: '0.03 m' },
      ];

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

    test('Should use default units given a base', () => {

      const base = 1024;
      const format = createFormatter({
        find: { base },
      });

      const values = [
        { value: 0, expected: '0' },
        { value: 0.5, expected: '512 m' },
        { value: 500, expected: '500' },
        { value: 1.2 * base ** 1, expected: '1.2 k' },
        { value: 1.2 * base ** 2, expected: '1.2 M' },
        { value: 1.2 * base ** 3, expected: '1.2 G' },
        { value: 1.2 * base ** 4, expected: '1.2 T' },
        { value: 1.2 * base ** -1, expected: '1.2 m' },
        { value: 1.2 * base ** -2, expected: `1.2 ${MICRO}` },
        { value: 1.2 * base ** -3, expected: '1.2 n' },
        { value: 1.2 * base ** -4, expected: '1.2 p' },
        { value: 1.2 * base ** -5, expected: '1.2 f' },
      ];

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

    test('Should use default units given an empty object', () => {

      const format = createFormatter({
        find: {},
      });

      const values = [
        { value: 0, expected: '0' },
        { value: 0.5, expected: '500 m' },
        { value: 500, expected: '500' },
        { value: 12e12, expected: '12 T' },
        { value: 12e9, expected: '12 G' },
        { value: 12e6, expected: '12 M' },
        { value: 12e3, expected: '12 k' },
        { value: 12, expected: '12' },
        { value: 12e-3, expected: '12 m' },
        { value: 12e-6, expected: '12 \u00b5' },
        { value: 12e-9, expected: '12 n' },
        { value: 12e-12, expected: '12 p' },
        { value: 12e-15, expected: '12 f' },
      ];

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

    test('Should use deprecated find sub-option', () => {

      const format = createFormatter({
        find: {
          find: [
            { pre: 'm', exp: -1 },
            { pre: 'k', exp: 1 },
            { pre: '', exp: 0 },
          ],
        },
      });

      const values = [
        { value: 0, expected: '0' },
        { value: 3, expected: '3' },
        { value: 30e3, expected: '30 k' },
        { value: 30e6, expected: '30000 k' },
        { value: 30e-3, expected: '30 m' },
        { value: 30e-6, expected: '0.03 m' },
      ];

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

  });

  describe('"find" option as function', () => {

    test('Should pass value to find function', () => {

      const format = createFormatter({
        find: (value: number) => {
          return value >= 1 ? { pre: 's', mul: 1 } : { pre: 'ms', mul: 1e-3 };
        },
      });

      const values = [
        { value: 2, expected: '2 s' },
        { value: 500e-3, expected: '500 ms' },
        { value: 500e-6, expected: '0.5 ms' },
      ];

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

    test('Should throw on invalid find function result', () => {

      const values = [
        true,
        false,
        0,
        -10,
        'string',
        '',
      ];

      values.forEach((value) => {

        const format = createFormatter({
          find: () => value as never,
        });

        expect(() => format(10)).toThrow('is not a valid return value for "find" option');

      });

    });

    test('Should throw on invalid find function resulting multiplier', () => {

      const values = [
        { pre: '', mul: 0 },
        { pre: '', mul: -10 },
        { pre: '', mul: NaN },
        { pre: '', mul: Infinity },
        { pre: '', mul: -Infinity },
      ];

      values.forEach((value) => {

        const format = createFormatter({
          find: () => value,
        });

        expect(() => format(10)).toThrow(RangeError);
        expect(() => format(10)).toThrow('is not a valid multiplier');

      });

    });

    test('Should use "find" option as function result in deprecated form', () => {

      const format = createFormatter({
        find: () => ({ pre: 'x', div: 2 }),
      });

      expect(format(10)).toBe('5 x');

    });

    test('Should interpret returning nullish as unity', () => {

      const nullishReturningFunctions = [
        () => null,
        () => undefined,
        () => { /* */ },
      ];

      nullishReturningFunctions.forEach((find) => {
        expect(format(10000, { find })).toBe('10000');
      });

    });

  });

});
