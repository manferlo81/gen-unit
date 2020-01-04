import { createFormatter } from '../../src'

describe('format', () => {

  test('should not throw if no option passed', () => {
    expect(() => createFormatter()).not.toThrow()
  })

  const format = createFormatter({})

  const values = [
    { value: 0, expected: '0' },
    { value: 0.123, expected: '123 m' },
    { value: 123, expected: '123' },
    { value: 1230, expected: '1.23 K' },
  ]

  test('should format number', () => {
    values.forEach(({ value, expected }) => {
      const result = format(value)
      expect(result).toBe(expected)
    })
  })

})
