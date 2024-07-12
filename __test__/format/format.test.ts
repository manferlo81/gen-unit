import { format, MICRO } from '../../src';

describe('format', () => {

  test.each([
    ['E', 'exa', 1.2e18, '1.2'],
    ['P', 'peta', 1.2e15, '1.2'],
    ['T', 'tera', 1.2e12, '1.2'],
    ['G', 'giga', 1.2e9, '1.2'],
    ['M', 'mega', 1.2e6, '1.2'],
    ['k', 'kilo', 1.2e3, '1.2'],
    ['m', 'milli', 1.2e-3, '1.2'],
    [MICRO, 'micro', 1.2e-6, '1.2'],
    ['n', 'nano', 1.2e-9, '1.2'],
    ['p', 'pico', 1.2e-12, '1.2'],
    ['f', 'femto', 1.2e-15, '1.2'],
    ['a', 'atto', 1.2e-18, '1.2'],
  ])('Should format with unit "%s" (%s)', (unit, _desc, value, expected) => {
    expect(format(value, { unit: 'g', round: 1 })).toBe(`${expected} ${unit}g`);
  });

});
