import { createFormatter } from '../../src';

describe('format round option', () => {

  test('should throw if "dec" sub-option is not a number', () => {
    expect(() => createFormatter({ round: { dec: 'not-a-number' } })).toThrow();
  });

  test('should not throw if "dec" sub-option is a numeric string', () => {
    expect(() => createFormatter({ round: { dec: '2' } })).not.toThrow();
  });

  test('should accept number as round option', () => {
    const format = createFormatter({ round: 3 });
    const result = format(10.111111);
    expect(result).toBe('10.111');
  });

  test('should default to 2 decimal places', () => {
    const format = createFormatter({});
    const result = format(10.111111);
    expect(result).toBe('10.11');
  });

  test('should format with given number of decimal points (using number)', () => {
    const format = createFormatter({ dec: 3 });
    const result = format(10.111111);
    expect(result).toBe('10.111');
  });

  test('should format with given number of decimal points (using numeric string)', () => {
    const format = createFormatter({ round: { dec: '3' } });
    const result = format(10.111111);
    expect(result).toBe('10.111');
  });

  test('should return with fixed number of decimal points', () => {
    const format = createFormatter({ round: { fixed: true } });
    const result = format(11);
    expect(result).toBe('11.00');
  });

  test('should return with fixed number of decimal points (with unit prefix)', () => {
    const format = createFormatter({ round: { fixed: true } });
    const result = format(123e-3);
    expect(result).toBe('123.00 m');
  });

  test('should return with fixed number of decimal points (with unit)', () => {
    const format = createFormatter({ unit: 'g', round: { fixed: true } });
    const result = format(123e-3);
    expect(result).toBe('123.00 mg');
  });

  test('should use custom rounder', () => {
    const round = (num: number): number => Math.round(num);
    const format = createFormatter({ unit: 'g', round });
    const result = format(123.7e-3);
    expect(result).toBe('124 mg');
  });

});
