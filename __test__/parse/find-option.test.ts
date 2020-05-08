import { createParser } from '../../src';

describe('parse "find" option', () => {

  test('Should use "find" option as number', () => {

    const base = 1024;
    const parse = createParser({
      find: base,
    });

    const values = [
      { value: '1.2k', expected: 1.2 * base },
      { value: '1.2m', expected: 1.2 / base },
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
      { value: '1.2k', expected: 1.2e3 },
      { value: '1.2m', expected: 1.2e-3 },
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
      { value: '1.2k', expected: 1.2 * base },
      { value: '1.2m', expected: 1.2 / base },
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
      { value: '1.2f', expected: 1.2 / base ** 5 },
      { value: '1.2p', expected: 1.2 / base ** 4 },
      { value: '1.2n', expected: 1.2 / base ** 3 },
      { value: '1.2u', expected: 1.2 / base ** 2 },
      { value: '1.2m', expected: 1.2 / base },
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
      { value: '1.2k', expected: 1.2e3 },
      { value: '1.2', expected: 1.2 },
      { value: '1.2m', expected: 1.2e-3 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

  test('Should use default base and find if empty object passed', () => {

    const parse = createParser({
      find: {},
    });

    const values = [
      { value: '1.2f', expected: 1.2e-15 },
      { value: '1.2p', expected: 1.2e-12 },
      { value: '1.2n', expected: 1.2e-9 },
      { value: '1.2u', expected: 1.2e-6 },
      { value: '1.2m', expected: 1.2e-3 },
      { value: '1.2', expected: 1.2 },
      { value: '1.2k', expected: 1.2e3 },
      { value: '1.2K', expected: 1.2e3 },
      { value: '1.2meg', expected: 1.2e6 },
      { value: '1.2M', expected: 1.2e6 },
      { value: '1.2G', expected: 1.2e9 },
      { value: '1.2T', expected: 1.2e12 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

  test('Should use "find" option as function returning object | null', () => {

    const parse = createParser({
      find: (unit) => (unit === 'k' ? { mul: 1000 } : null),
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

  test('Should use "find" option as function returning number', () => {

    const parse = createParser({
      find: (unit) => unit === 'k' ? 1000 : NaN,
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

});
