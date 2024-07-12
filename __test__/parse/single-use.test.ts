import { parse } from '../../src';

describe('single use parse method', () => {

  test('Should parse input', () => {
    expect(parse('10 m')).toBeCloseTo(10e-3);
  });

});
