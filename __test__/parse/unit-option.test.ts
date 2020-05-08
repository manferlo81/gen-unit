import { createParser } from '../../src';

describe('parse "unit" option', () => {

  test('Should return NaN on incorrect unit', () => {
    const parse = createParser({ unit: 'g' });
    expect(parse('10 x')).toBeNaN();
  });

  test('Should parse with correct unit', () => {

    const parse = createParser({ unit: 'g' });

    const values = [
      { value: '10m', expected: 10e-3 },
      { value: '10mg', expected: 10e-3 },
      { value: '10g', expected: 10 },
      { value: '10kg', expected: 10e3 },
      { value: '10Kg', expected: 10e3 },
      { value: '10k', expected: 10e3 },
      { value: '10K', expected: 10e3 },
      { value: '2M', expected: 2e6 },
      { value: '2meg', expected: 2e6 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBe(expected);
    });

  });

  test('Should parse with whole unit over prefix', () => {

    const parse = createParser({ unit: 'm' });

    const values = [
      { value: '10 m', expected: 10 },
      { value: '10 mm', expected: 10e-3 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBe(expected);
    });

  });

  test('Should parse invalid exponential (e) as unit', () => {

    const parse = createParser({ unit: 'e' });

    const values = [
      { value: '10e', expected: 10 },
      { value: '10e-3', expected: 10e-3 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBe(expected);
    });

  });

  test('Should parse prefixed unit over prefix', () => {

    const parse = createParser({ unit: 'eg' });

    const values = [
      { value: '10meg', expected: 10e-3 },
      { value: '10megeg', expected: 10e6 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBe(expected);
    });

  });

});
