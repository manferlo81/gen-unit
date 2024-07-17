import { createParser, parse, type MatchFunction } from '../../src';

describe('parse "match" option', () => {

  describe('"match" option as RegExp', () => {

    test('Should use "match" option as RegExp', () => {
      const parse = createParser({
        match: /^\s*([\d.]+)\s*([a-z]*)\s*$/i,
        find: [{ pre: 'x', exp: 0 }],
      });
      expect(parse('10 x')).toBeCloseTo(10);
      expect(parse('10.3.3 x')).toBeNaN();
    });

    test('Should throw if RegExp doesn\'t capture value & unit', () => {
      const parse = createParser({
        match: /^\s*([\d.]+)\s*[a-z]*\s*$/i,
      });
      expect(() => parse('10m')).toThrow('Match result array should have 2 items, got 1');
    });

  });

  describe('"match" option as string', () => {

    test('Should use "match" option as string', () => {
      const parse = createParser({
        match: '^\\s*([\\d.]+)\\s*([a-z]*)\\s*$',
        find: [{ pre: 'x', exp: 0 }],
      });
      expect(parse('10 x')).toBeCloseTo(10);
    });

    test('Should throw if RegExp string doesn\'t capture value & unit', () => {
      const parse = createParser({
        match: '^\\s*[\\d.]+\\s*[a-z]*\\s*$',
      });
      expect(() => parse('10 x')).toThrow('Match result array should have 2 items, got 0');
    });

    test('Should coerce "match" option to string', () => {
      const match = { toString: () => '^\\s*([\\d.]+)\\s*([a-z]*)\\s*$' } as never;
      const parse = createParser({
        match,
        find: [{ pre: 'x', exp: 0 }],
      });
      expect(parse('10 x')).toBeCloseTo(10);
    });

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

    test('Should return NaN if "match" option as function returns nullish', () => {

      const nullishReturningFunction = [
        () => null,
        () => undefined,
        () => { /**/ },
      ];

      nullishReturningFunction.forEach((match) => {
        expect(parse('1k', { match })).toBeNaN();
      });

    });

    test('Should throw if "match" option as function returns non array', () => {

      const nonArrayReturningFunction = [
        () => ({}),
        () => '',
        () => 'string',
        () => 0,
        () => 1,
        () => NaN,
        () => Infinity,
        () => true,
        () => false,
      ];

      nonArrayReturningFunction.forEach((match) => {
        expect(() => parse('1k', { match } as never)).toThrow('Match function should return an array of strings');
      });

    });

    test('Should throw if "match" option as function returns array with less than 2 items', () => {

      const invalidArrayReturningFunctions = [
        [],
        ['10'],
      ];

      invalidArrayReturningFunctions.forEach((result) => {
        const match = () => result as never;
        const { length } = result;
        expect(() => parse('1k', { match })).toThrow(`Match result array should have 2 items, got ${length}`);
      });
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
