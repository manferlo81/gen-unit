import { createParser } from '../../src';

describe('generic parse', () => {

  test('should not throw if no option passed', () => {
    expect(() => createParser()).not.toThrow();
  });

  const parse = createParser({});

  test('should return NaN on invalid numeric input', () => {
    const result = parse('10.3.4');
    expect(result).toBeNaN();
  });

  test('should return NaN on non numeric input', () => {
    const result = parse('non-numeric');
    expect(result).toBeNaN();
  });

  test('should return NaN on invalid unit', () => {
    const result = parse('10 x');
    expect(result).toBeNaN();
  });

  test('should parse number', () => {
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

  test('should parse numeric string', () => {
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

  test('should parse exponential numeric string', () => {
    const values = [
      { value: '1e3', expected: 1e3 },
      { value: '10e-3', expected: 10e-3 },
      { value: '10e+3', expected: 10e+3 },
      { value: '3e-6', expected: 3e-6 },
      { value: '123e-6', expected: 123e-6 },
      { value: '123e+6', expected: 123e+6 },
    ];
    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected);
    });
  });

  test('should parse string with unit', () => {
    const values = [
      { value: '10u', expected: 10e-6 },
      { value: '10 u', expected: 10e-6 },
      { value: '10    u', expected: 10e-6 },
    ];
    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected);
    });
  });

  test('should parse exponential numeric string with unit', () => {
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

});
