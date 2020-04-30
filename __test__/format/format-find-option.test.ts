import { createFormatter } from '../../src';

describe('formatter "find" option', () => {

  test('should use "find" option as array', () => {

    const format = createFormatter({
      find: [
        { pre: 'm', div: 1e-3 },
        { pre: 'K', div: 1e3 },
        { pre: '', div: 1 },
      ],
    });

    const values = [
      { value: 0, expected: '0' },
      { value: 3, expected: '3' },
      { value: 30e3, expected: '30 K' },
      { value: 30e6, expected: '30000 K' },
      { value: 30e-3, expected: '30 m' },
      { value: 30e-6, expected: '0.03 m' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected);
    });

  });

  test('should use "find" option as array of exponents', () => {

    const format = createFormatter({
      find: [
        { pre: 'm', exp: -3 },
        { pre: 'K', exp: 3 },
        { pre: '', exp: 0 },
      ],
    });

    const values = [
      { value: 0, expected: '0' },
      { value: 3, expected: '3' },
      { value: 30e3, expected: '30 K' },
      { value: 30e6, expected: '30000 K' },
      { value: 30e-3, expected: '30 m' },
      { value: 30e-6, expected: '0.03 m' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected);
    });

  });

  test('should use "find" option as function', () => {

    const format = createFormatter({
      find: () => ({ pre: 'x', div: 1 }),
    });

    expect(format(10)).toBe('10 x');

  });

  test('should use "find" option as object', () => {

    const format = createFormatter({
      find: {
        base: 1000,
        find: [
          { pre: 'm', exp: -1 },
          { pre: 'K', exp: 1 },
          { pre: '', exp: 0 },
        ],
      },
    });

    const values = [
      { value: 0, expected: '0' },
      { value: 3, expected: '3' },
      { value: 30e3, expected: '30 K' },
      { value: 30e6, expected: '30000 K' },
      { value: 30e-3, expected: '30 m' },
      { value: 30e-6, expected: '0.03 m' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected);
    });

  });

  test('should default to unity if array empty', () => {

    const format = createFormatter({
      unit: 'x',
      find: [],
    });

    expect(format(100)).toBe('100 x');

  });

  test('should respect "div" member', () => {

    const format = createFormatter({
      find: () => ({ pre: 'x', div: 10 }),
    });

    expect(format(100)).toBe('10 x');

  });

  test('should pass value back', () => {

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

});
