import { createFormatter } from '../../src';

describe('format "output" option', () => {

  test('Should throw if invalid "output" option', () => {
    const invalid = [
      0,
      1,
      '',
      'string',
      true,
      false,
      [],
      {},
    ];
    invalid.forEach((option) => {
      expect(() => createFormatter({ output: option as never })).toThrow('Invalid "output" option');
    });
  });

  test('Should use "output" option', () => {
    const format = createFormatter({
      output: (value, pre) => `${value}--${pre}`,
    });
    expect(format(10e-3)).toBe('10--m');
  });

  test('Should use "output" option with unit', () => {
    const format = createFormatter({
      unit: 'g',
      output: (value, pre, unit) => `${value}-${pre}-${unit}`,
    });
    expect(format(10e-3)).toBe('10-m-g');
  });

  test('Should use returned number and convert it to string', () => {
    const format = createFormatter({
      unit: 'g',
      output: (value) => value,
    });
    expect(format(10e-3)).toBe('10');
  });

});
