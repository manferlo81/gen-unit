import { createParser } from '../../src';

describe('parse removed options', () => {

  test('Should throw if removed option used', () => {
    const removedOptions = [
      { name: 'table', value: [] },
    ];
    removedOptions.forEach(({ name, value }) => {
      expect(() => createParser({ [name]: value } as never)).toThrow(`Option "${name}" has been removed`);
    });
  });

});
