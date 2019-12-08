import { createParser } from '../../src'

describe('generic parse', () => {

  test('should not throw if no option passed', () => {
    expect(() => createParser()).not.toThrow()
  })

  const parse = createParser({})

  test('should return null on invalid numeric input', () => {
    const result = parse('10.3.4')
    expect(result).toBeNull()
  })

  test('should return null on non numeric input', () => {
    const result = parse('non-numeric')
    expect(result).toBeNull()
  })

  test('should parse number', () => {
    const result = parse(10)
    expect(result).toBe(10)
  })

  test('should parse numeric string', () => {
    const result = parse('10')
    expect(result).toBe(10)
  })

  test('should parse exponential numeric string', () => {
    const result = parse('10e-3')
    expect(result).toBe(10e-3)
  })

  test('should parse string with unit', () => {
    const result = parse('10u')
    expect(result).toBeCloseTo(10e-6)
  })

  test('should parse exponential numeric string with unit', () => {
    const result = parse('100e-3 m')
    expect(result).toBe(100e-6)
  })

})
