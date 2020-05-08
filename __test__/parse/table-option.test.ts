import { createParser } from '../../src';

describe('parse "table" option', () => {

  test('Should use deprecated "table" option', () => {

    const parse = createParser({
      table: [
        { pre: 'k', power: 3 },
        { pre: 'm', power: -3 },
      ],
    });

    const values = [
      { value: '1.2k', expected: 1.2e3 },
      { value: '1.2m', expected: 1.2e-3 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

});
