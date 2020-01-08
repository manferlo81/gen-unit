import { createFormatter } from '../../src'

describe('formatter "outout" option', () => {

  test('should use outout option', () => {
    const format = createFormatter({
      output: (value, pre) => `${value}--${pre}`,
    })
    expect(format(10e-3)).toBe('10--m')
  })

  test('should use outout option with unit', () => {
    const format = createFormatter({
      unit: 'g',
      output: (value, pre, unit) => `${value}-${pre}-${unit}`,
    })
    expect(format(10e-3)).toBe('10-m-g')
  })

})
