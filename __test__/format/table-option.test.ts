import { createFormatter } from '../../src';

describe('format deprecated "table" option', () => {

  test('Should format number', () => {

    const format = createFormatter({
      table: [
        { pre: '', power: 0 },
        { pre: 'm', power: -3 },
      ],
    });

    const values = [
      { value: 0, expected: '0' },
      { value: 1.2e-3, expected: '1.2 m' },
    ];

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected);
    });

  });

});
