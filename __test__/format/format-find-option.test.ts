import { createFormatter } from '../../src'

describe('formatter "find" option', () => {

  test('should use find unit option', () => {
    const format = createFormatter({
      find: () => ({ pre: 'x', div: 1 }),
    })
    expect(format(10)).toBe('10 x')
  })

  test('should respect "div" member', () => {
    const format = createFormatter({
      find: () => ({ pre: 'x', div: 10 }),
    })
    expect(format(100)).toBe('10 x')
  })

  test('should pass value', () => {
    const format = createFormatter({
      find: (value: number) => (value >= 1 ? { pre: 's', div: 1 } : { pre: 'ms', div: 1e-3 }),
    })
    expect(format(2)).toBe('2 s')
    expect(format(500e-3)).toBe('500 ms')
    expect(format(500e-6)).toBe('0.5 ms')
  })

})
