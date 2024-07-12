import { createParser, type MatchFunction } from '../../src';

describe('parse "match" option', () => {

  test('Should use "match" option as RegExp', () => {
    const parse = createParser({
      match: /^\s*([\d.]+)\s*([a-z]*)\s*$/i,
      find: [{ pre: 'x', exp: 0 }],
    });
    expect(parse('10 x')).toBeCloseTo(10);
    expect(parse('10.3.3 x')).toBeNaN();
  });

  test('Should use "match" option as string', () => {
    const parse = createParser({
      match: '^\\s*([\\d.]+)\\s*([a-z]*)\\s*$',
      find: [{ pre: 'x', exp: 0 }],
    });
    expect(parse('10 x')).toBeCloseTo(10);
  });

  test('Should convert "match" option to string', () => {
    const parse = createParser({
      match: { toString: () => '^\\s*([\\d.]+)\\s*([a-z]*)\\s*$' } as never,
      find: [{ pre: 'x', exp: 0 }],
    });
    expect(parse('10 x')).toBeCloseTo(10);
  });

  describe('"match" option as function', () => {

    test('Should use "match" option as function', () => {
      const parse = createParser({
        match: () => {
          return ['10', 'x'];
        },
        find: [{ pre: 'x', exp: 0 }],
      });
      expect(parse('anything')).toBeCloseTo(10);
    });

    test('Should receive input as argument', () => {
      const match: MatchFunction = jest.fn(() => {
        return ['10', 'x'];
      });
      const parse = createParser({
        match,
        find: [{ pre: 'x', exp: 0 }],
      });
      parse('anything');
      expect(match).toHaveBeenCalledTimes(1);
      expect(match).toHaveBeenCalledWith('anything');
    });

  });

});
