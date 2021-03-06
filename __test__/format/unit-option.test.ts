import { createFormatter, MICRO } from '../../src';

describe('format "unit" option', () => {

  test('Should format number using given unit', () => {

    const format = createFormatter({ unit: 'g' });

    const values = [
      { value: 0, expected: '0 ' },
      { value: 3e-15, expected: '3 f' },
      { value: 3e-12, expected: '3 p' },
      { value: 3e-9, expected: '3 n' },
      { value: 3e-6, expected: `3 ${MICRO}` },
      { value: 3e-3, expected: '3 m' },
      { value: 3, expected: '3 ' },
      { value: 3e3, expected: '3 K' },
      { value: 3e6, expected: '3 M' },
      { value: 3e9, expected: '3 G' },
      { value: 3e12, expected: '3 T' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(`${expected}g`);
    });

  });

  test('Should format number using unit as function', () => {

    const format = createFormatter({
      unit: () => 'g',
    });

    const values = [
      { value: 0, expected: '0 ' },
      { value: 3e-15, expected: '3 f' },
      { value: 3e-12, expected: '3 p' },
      { value: 3e-9, expected: '3 n' },
      { value: 3e-6, expected: `3 ${MICRO}` },
      { value: 3e-3, expected: '3 m' },
      { value: 3, expected: '3 ' },
      { value: 3e3, expected: '3 K' },
      { value: 3e6, expected: '3 M' },
      { value: 3e9, expected: '3 G' },
      { value: 3e12, expected: '3 T' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(`${expected}g`);
    });

  });

  test('Should format number using dynamic unit', () => {

    const format = createFormatter({
      unit: (value) => value === 1 ? 'X' : 'Y',
    });

    const values = [
      { value: 1, expected: '1 X' },
      { value: 2, expected: '2 Y' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected);
    });

  });

});
