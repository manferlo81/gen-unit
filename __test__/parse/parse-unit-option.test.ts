import { createParser } from '../../src'

describe('parse unit option', () => {

  const parse = createParser({ unit: 'g' })

  test('should return null with incorrect unit', () => {
    const result = parse('10x')
    expect(result).toBeNull()
  })

  test('should parse with correct unit', () => {
    const result = parse('10g')
    expect(result).toBe(10)
  })

})
