import { createFormatter, MICRO } from '../../src';

describe('format "find" option', () => {

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

  test('Should use "find" option as function', () => {

    const format = createFormatter({
      find: () => ({ pre: 'x', div: 2 }),
    });

    expect(format(10)).toBe('5 x');

  });

  test('Should use "find" option as object', () => {

    const format = createFormatter({
      find: {
        base: 10,
        find: [
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
      { value: 12e-6, expected: '12 \u00b5' },
      { value: 12e-9, expected: '12 n' },
      { value: 12e-12, expected: '12 p' },
      { value: 12e-15, expected: '12 f' },
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

  test('Should default to unity if array empty', () => {

    const format = createFormatter({
      find: [],
    });

    expect(format(100)).toBe('100');

  });

  test('Should pass value to find function', () => {

    const format = createFormatter({
      find: (value: number) => (value >= 1 ? { pre: 's', div: 1 } : { pre: 'ms', div: 1e-3 }),
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

  test('Should throw on invalid find function result divider', () => {

    const values = [
      { pre: '', div: 0 },
    ];

    values.forEach((value) => {

      const format = createFormatter({
        find: () => value,
      });

      expect(() => format(10)).toThrow('is not a valid divider');

    });

  });

});
