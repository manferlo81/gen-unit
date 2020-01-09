import { format } from '../../src'

describe('single use format', () => {

  test('should format number', () => {
    expect(format(10)).toBe('10')
  })

  test('should format number (with options)', () => {
    expect(format(10, { unit: 'g' })).toBe('10 g')
  })

})
