import { createFormatter } from '../../src';

describe('format "round" option', () => {

  test('Should throw if "dec" sub-option is not a number', () => {
    expect(() => createFormatter({ round: { dec: 'not-a-number' } })).toThrow();
  });

  test('Should not throw if "dec" sub-option is a numeric string', () => {
    expect(() => createFormatter({ round: { dec: '2' } })).not.toThrow();
  });

  test('Should accept number as round option', () => {
    const format = createFormatter({ round: 3 });
    expect(format(10.111111)).toBe('10.111');
  });

  test('Should format with given number of decimal points, using number', () => {
    const format = createFormatter({ dec: 3 });
    expect(format(10.111111)).toBe('10.111');
  });

  test('Should format with given number of decimal points, using numeric string', () => {
    const format = createFormatter({ round: { dec: '3' } });
    expect(format(10.111111)).toBe('10.111');
  });

  test('Should return with fixed number of decimal points', () => {

    const format = createFormatter({ round: { fixed: true } });

    const values = [
      { value: 11, expected: '11.00' },
      { value: 123e-3, expected: '123.00 m' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected);
    });

  });

  test('Should return with fixed number of decimal points (with unit)', () => {
    const format = createFormatter({ unit: 'g', round: { fixed: true } });
    expect(format(123e-3)).toBe('123.00 mg');
  });

  test('Should use custom rounder', () => {
    const format = createFormatter({ unit: 'g', round: Math.round });
    expect(format(123.7e-3)).toBe('124 mg');
  });

  test('Should default to 2 decimal places', () => {
    const format = createFormatter({});
    expect(format(10.111111)).toBe('10.11');
  });

});
