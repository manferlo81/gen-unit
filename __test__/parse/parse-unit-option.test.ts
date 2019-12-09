import { createParser } from '../../src'

describe('parse unit option', () => {

  test('should return null with incorrect unit', () => {
    const parse = createParser({ unit: 'g' })
    const result = parse('10 x')
    expect(result).toBeNull()
  })

  test('should parse with correct unit', () => {
    const parse = createParser({ unit: 'g' })
    const result = parse('10g')
    expect(result).toBe(10)
  })

  test('should parse with whole unit over prefix', () => {
    const parse = createParser({ unit: 'm' })
    const result = parse('10 m')
    expect(result).toBe(10)
  })

  test('should parse with prefixed unit if explicitly specified', () => {
    const parse = createParser({ unit: 'm' })
    const result = parse('10 mm')
    expect(result).toBeCloseTo(10e-3)
  })

})
