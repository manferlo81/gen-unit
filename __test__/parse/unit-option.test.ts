import { MICRO, createParser } from '../../src';

describe('parse "unit" option', () => {

  test('Should return NaN on incorrect unit', () => {

    const parse = createParser({ unit: 'g' });

    const values = [
      '10 x',
      '10 xg',
      '10 gx',
      '10 mx',
      '10 Kx',
    ];

    values.forEach((value) => {
      expect(parse(value)).toBeNaN();
    });

  });

  test('Should parse with correct unit', () => {

    const unit = 'g';
    const parse = createParser({ unit });

    const values = [
      { value: '10p', expected: 10e-12 },
      { value: '10n', expected: 10e-9 },
      { value: '10u', expected: 10e-6 },
      { value: `10${MICRO}`, expected: 10e-6 },
      { value: '10m', expected: 10e-3 },
      { value: '10', expected: 10 },
      { value: '10k', expected: 10e3 },
      { value: '10K', expected: 10e3 },
      { value: '10M', expected: 10e6 },
      { value: '10G', expected: 10e9 },
      { value: '10T', expected: 10e12 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected);
      expect(parse(`${value}${unit}`)).toBeCloseTo(expected);
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
      { value: '10Meg', expected: 10e6 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBe(expected);
    });

  });

});
