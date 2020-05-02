import { createParser } from '../../src';

describe('parse "table" option', () => {

  test('Should', () => {

    const parse = createParser({
      table: [
        { pre: 'k', power: 3 },
        { pre: 'm', power: -3 },
      ],
    });

    const values = [
      { value: '1.2k', expected: 1200 },
      { value: '1.2m', expected: 0.0012 },
    ];

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 6);
    });

  });

});
