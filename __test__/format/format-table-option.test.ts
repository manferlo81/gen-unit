import { createFormatter } from '../../src';

describe('format deprecated "table" option', () => {

  const format = createFormatter({
    table: [
      { pre: '', power: 0 },
      { pre: 'm', power: -3 },
    ],
  });

  test('should format zero', () => {
    const result = format(0);
    expect(result).toBe('0');
  });

  test('should format number', () => {
    const result = format(1.2e-3);
    expect(result).toBe('1.2 m');
  });

});
