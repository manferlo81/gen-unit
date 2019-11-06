import { createFormatter } from '../../src'

describe('format', () => {

  test('should not throw if no option passed', () => {
    expect(() => createFormatter()).not.toThrow()
  })

  const format = createFormatter({})

  test('should format number', () => {
    const result = format(10000)
    expect(result).toBe('10 K')
  })

})
