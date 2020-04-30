import { parse } from '../../src';

describe('single use parse', () => {

  test('should parse input', () => {
    expect(parse('10 m')).toBeCloseTo(10e-3);
  });

});
