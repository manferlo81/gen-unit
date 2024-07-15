import { createFormatter, CreateFormatterOptions, format as oneStepFormat } from '../../src';

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
        expect(oneStepFormat(10e3, { output: { space } })).toBe(`10${space}k`);
      });

    });

    test('Should default to 1 space if nullish space given or none provided', () => {

      const spaces = [
        null,
        undefined,
      ];

      expect(oneStepFormat(10e3, { output: {} })).toBe('10 k');

      spaces.forEach((space) => {
        expect(oneStepFormat(10e3, { output: { space } })).toBe('10 k');
      });

    });

  });

  describe('"output" option as function', () => {

    test('Should use "output" option', () => {
      const options: CreateFormatterOptions = {
        output: (value, pre) => `${value}--${pre}`,
      };
      expect(oneStepFormat(10e-3, options)).toBe('10--m');
    });

    test('Should use "output" option with unit', () => {
      const options: CreateFormatterOptions = {
        unit: 'g',
        output: (value, pre, unit) => `${value}-${pre}-${unit}`,
      };
      expect(oneStepFormat(10e-3, options)).toBe('10-m-g');
    });

    test('Should use returned number and convert it to string', () => {
      const options: CreateFormatterOptions = {
        unit: 'g',
        output: (value) => value,
      };
      expect(oneStepFormat(10e-3, options)).toBe('10');
    });

  });

});
