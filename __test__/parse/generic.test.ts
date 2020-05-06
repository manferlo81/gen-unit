import { createParser } from '../../src';

describe('generic parse', () => {

  test('Should not throw if no option passed', () => {
    expect(() => createParser()).not.toThrow();
  });

  const parse = createParser({});

  test('Should return NaN on invalid input', () => {

    const values = [
      '',
      '10.3.4',
      'non-numeric',
      '10 x',
      null,
      undefined,
      true,
      false,
      { toString: (): string => '' },
      Infinity,
      -Infinity,
      'Infinity',
    ];

    values.forEach((value) => {
      expect(parse(value as never)).toBeNaN();
    });

  });

  // test('Should return NaN on empty string', () => {
  //   expect(parse('')).toBeNaN();
  // });

  // test('Should return NaN on invalid numeric input', () => {
  //   expect(parse('10.3.4')).toBeNaN();
  // });

  // test('Should return NaN on non numeric input', () => {
  //   expect(parse('non-numeric')).toBeNaN();
  // });

  // test('Should return NaN on invalid unit', () => {
  //   expect(parse('10 x')).toBeNaN();
  // });

  test('Should parse number', () => {

    const values = [
      0,
      1,
      2,
      10,
      123,
      0.1,
      2.3,
    ];

    values.forEach((value) => {
      expect(parse(value)).toBe(value);
    });

  });

  test('Should parse numeric string', () => {

    const values = [
      { value: '0', expected: 0 },
      { value: '1', expected: 1 },
      { value: '10', expected: 10 },
      { value: '123', expected: 123 },
      { value: '0.0', expected: 0 },
      { value: '0.1', expected: 0.1 },
      { value: '123.4', expected: 123.4 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBe(expected);
    });

  });

  test('Should parse exponential numeric string', () => {

    const values = [
      { value: '1e3', expected: 1e3 },
      { value: '10e-3', expected: 10e-3 },
      { value: '10e+3', expected: 10e+3 },
      { value: '3e-6', expected: 3e-6 },
      { value: '123e-6', expected: 123e-6 },
      { value: '123e+6', expected: 123e+6 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBe(expected);
    });

  });

  test('Should ignore extra spaces', () => {

    const values = [
      { value: '10u', expected: 10e-6 },
      { value: '10 u', expected: 10e-6 },
      { value: '10    u', expected: 10e-6 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected);
    });

  });

  test('Should parse exponential numeric string with unit', () => {

    const values = [
      { value: '100e-3 m', expected: 100e-6 },
      { value: '100e-3 K', expected: 100 },
      { value: '100e3 m', expected: 100 },
      { value: '100e+3 m', expected: 100 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected);
    });

  });

  test('Should return 0 without checking for units', () => {

    const values = [
      '0f',
      '0p',
      '0n',
      '0u',
      '0m',
      '0',
      '0k',
      '0K',
      '0meg',
      '0M',
      '0G',
      '0T',
    ];

    values.forEach((value) => {
      expect(parse(value)).toBe(0);
    });

  });

});
