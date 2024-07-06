import { createParser } from '../../src';

describe('parse removed options', () => {

  test('Should throw if removed "table" option used', () => {
    expect(() => createParser({ table: [] } as never)).toThrow('Option "table" has been removed');
  });

});
