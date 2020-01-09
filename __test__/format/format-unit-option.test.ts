import { createFormatter } from '../../src'

describe('format unit option', () => {

  const format = createFormatter({ unit: 'g' })

  test('should format zero (using given unit)', () => {
    const result = format(0)
    expect(result).toBe('0 g')
  })

  const values = [
    { value: 10, expected: '10 g' },
    { value: 10e3, expected: '10 Kg' },
  ]

  values.forEach(({ value, expected }) => {
    test(`should format number (using given unit) ${value} => "${expected}" `, () => {
      expect(format(value)).toBe(expected)
    })
  })

})
