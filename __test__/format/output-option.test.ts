import { createFormatter } from '../../src';

describe('format "output" option', () => {

  test('Should throw if invalid "output" option', () => {

    const invalidOutputOptions = [
      0,
      1,
      '',
      'string',
      true,
      false,
    ];

    invalidOutputOptions.forEach((option) => {
      expect(() => createFormatter({ output: option as never })).toThrow('Invalid "output" option');
    });

  });

  describe('"output" option as object', () => {

    test('Should format with given space', () => {

      const spaces = [
        '',
        '-',
        '--',
      ];

      spaces.forEach((space) => {
        const format = createFormatter({
          output: {
            space,
          },
        });
        expect(format(10e3)).toBe(`10${space}k`);
      });

    });

  });

  describe('"output" option as function', () => {

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

});
