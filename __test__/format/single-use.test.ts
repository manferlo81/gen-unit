import { format } from '../../src'

describe('single use format method', () => {

  test('Should format number', () => {
    expect(format(10)).toBe('10')
  })

  test('Should format number with options', () => {
    expect(format(10, { unit: 'g' })).toBe('10 g')
  })

})
