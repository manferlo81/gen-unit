import { createFormatter } from '../../src'

describe('format', () => {

  test('should not throw if no option passed', () => {
    expect(() => createFormatter()).not.toThrow()
  })

  const format = createFormatter({})

  const values = [
    { value: 0, expected: '0' },
    { value: 1e-15, expected: '1 f' },
    { value: 1e-12, expected: '1 p' },
    { value: 1e-9, expected: '1 n' },
    { value: 1e-3, expected: '1 m' },
    { value: 1, expected: '1' },
    { value: 1e3, expected: '1 K' },
    { value: 1e6, expected: '1 M' },
    { value: 1e9, expected: '1 G' },
    { value: 1e12, expected: '1 T' },
    { value: 123e-3, expected: '123 m' },
    { value: 123, expected: '123' },
    { value: 1.23e3, expected: '1.23 K' },
    { value: 1.230e-3, expected: '1.23 m' },
    { value: 1.230e-9, expected: '1.23 n' },
  ]

  test('should format number', () => {
    values.forEach(({ value, expected }) => {
      const result = format(value)
      expect(result).toBe(expected)
    })
  })

})
