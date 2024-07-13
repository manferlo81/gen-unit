import { createFormatter } from '../../src';

describe('format "round" option', () => {

  test('Should throw on invalid "round" option', () => {

    const values = [
      '',
      'string',
      true,
      false,
    ];

    values.forEach((invalid) => {
      const create = () => createFormatter({
        round: invalid as never,
      });
      expect(create).toThrow('Invalid "round" option');
    });

  });

  test('Should throw on invalid number "round" option', () => {

    const values = [
      -1,
      -10,
      NaN,
      Infinity,
      -Infinity,
    ];

    values.forEach((invalid) => {
      const create = () => createFormatter({
        round: invalid,
      });
      expect(create).toThrow('Can\'t create round function with');
    });

  });

  test('Should default to 2 decimal places', () => {

    const values = [
      { value: 10.1111111, expected: '10.11' },
      { value: 12.1, expected: '12.1' },
      { value: 12, expected: '12' },
    ];

    const format = createFormatter({});

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected);
    });

  });

  test('Should use "round" option as decimals if it\'s a number', () => {

    const values = [
      { value: 10.111111, dec: 0, expected: '10' },
      { value: 10.111111, dec: 1, expected: '10.1' },
      { value: 10.111111, dec: 2, expected: '10.11' },
      { value: 10.111111, dec: 3, expected: '10.111' },
    ];

    values.forEach(({ value, dec, expected }) => {
      const format = createFormatter({
        round: dec,
      });
      expect(format(value)).toBe(expected);
    });

  });

  describe('"round" option as object', () => {

    test('Should throw if "dec" sub-option is not a number', () => {

      const values = [
        'not-a-number',
        '3',
      ];

      values.forEach((value) => {
        const create = () => createFormatter({
          round: {
            dec: value as never,
          },
        });
        expect(create).toThrow('Invalid "round" option');
      });

    });

    test('Should throw if "dec" sub-option is an invalid number', () => {

      const values = [
        -1,
        -10,
        NaN,
        Infinity,
        -Infinity,
      ];

      values.forEach((invalid) => {
        const create = () => createFormatter({
          round: {
            dec: invalid,
          },
        });
        expect(create).toThrow('Can\'t create round function with');
      });

    });

    test('Should format with given number of decimals', () => {

      const values = [
        { value: 10.111111, dec: 0, expected: '10' },
        { value: 10.111111, dec: 1, expected: '10.1' },
        { value: 10.111111, dec: 2, expected: '10.11' },
        { value: 10.111111, dec: 3, expected: '10.111' },
      ];

      values.forEach(({ value, dec, expected }) => {
        const format = createFormatter({ round: { dec } });
        expect(format(value)).toBe(expected);
      });

    });

    test('Should return with fixed number of default decimal points (2)', () => {

      const values = [
        { value: 11, expected: '11.00 g' },
        { value: 123e-3, expected: '123.00 mg' },
        { value: 567.412e3, expected: '567.41 kg' },
      ];

      const format = createFormatter({
        unit: 'g',
        round: { fixed: true },
      });

      values.forEach(({ value, expected }) => {
        expect(format(value)).toBe(expected);
      });

    });

  });

  test('Should use "round" option as function', () => {

    const values = [
      { value: 123.7e-3, round: Math.round, expected: '124 mg' },
      { value: 14.1234e3, round: (input: number) => Math.round(input * 10) / 10, expected: '14.1 kg' },
    ];

    values.forEach(({ value, round, expected }) => {
      const format = createFormatter({ unit: 'g', round });
      expect(format(value)).toBe(expected);
    });

  });

});
