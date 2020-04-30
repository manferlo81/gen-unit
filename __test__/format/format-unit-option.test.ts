import { createFormatter } from '../../src';

describe('format unit option', () => {

  const format = createFormatter({ unit: 'g' });

  test('should format zero (using given unit)', () => {
    const result = format(0);
    expect(result).toBe('0 g');
  });

  const values = [
    { value: 10, expected: '10 ' },
    { value: 10e3, expected: '10 K' },
  ];

  test('should format number (using given unit)', () => {
    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(`${expected}g`);
    });
  });

  test('should format number (using unit as function)', () => {
    const format = createFormatter({
      unit: () => 'X',
    });
    expect(format(1)).toBe('1 X');
  });

  test('should format number (using dynamic unit)', () => {
    const format = createFormatter({
      unit: (value) => value === 1 ? 'X' : 'Y',
    });
    expect(format(1)).toBe('1 X');
    expect(format(2)).toBe('2 Y');
  });

});
