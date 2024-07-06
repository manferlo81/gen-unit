import { createFormatter } from '../../src';

describe('format removed options', () => {

  test('Should throw if removed option used', () => {
    const removedOptions = [
      { name: 'table', value: [] },
      { name: 'dec', value: 2 },
      { name: 'fixed', value: true },
    ];
    removedOptions.forEach(({ name, value }) => {
      expect(() => createFormatter({ [name]: value } as never)).toThrow(`Option "${name}" has been removed`);
    });
  });

});
