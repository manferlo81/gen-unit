import { createFormatter } from '../../src';

describe('format "outout" option', () => {

  test('Should use outout option', () => {
    const format = createFormatter({
      output: (value, pre) => `${value}--${pre}`,
    });
    expect(format(10e-3)).toBe('10--m');
  });

  test('Should use outout option with unit', () => {
    const format = createFormatter({
      unit: 'g',
      output: (value, pre, unit) => `${value}-${pre}-${unit}`,
    });
    expect(format(10e-3)).toBe('10-m-g');
  });

});
