import { format } from '../../src'

describe('single use format', () => {

  test('should format number', () => {
    expect(format(10)).toBe('10')
  })

})
