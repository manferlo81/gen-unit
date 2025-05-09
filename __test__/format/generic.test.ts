import { createFormatter, MICRO } from '../../src'

describe('generic format', () => {

  test('Should create formatter without options', () => {
    expect(createFormatter()).toBeInstanceOf(Function)
  })

  const format = createFormatter({})

  test('Should format non finite number', () => {

    const notFiniteValues = [
      NaN,
      Infinity,
      -Infinity,
    ]

    notFiniteValues.forEach((value) => {
      expect(format(value)).toBe(`${value}`)
    })

  })

  test('Should format number', () => {

    const values = [
      { value: 0, expected: '0' },
      { value: 1e-16, expected: '100 a' },
      { value: 1e-15, expected: '1 f' },
      { value: 1e-12, expected: '1 p' },
      { value: 1e-9, expected: '1 n' },
      { value: 1e-6, expected: `1 ${MICRO}` },
      { value: 1e-3, expected: '1 m' },
      { value: 1, expected: '1' },
      { value: 1e3, expected: '1 k' },
      { value: 1e6, expected: '1 M' },
      { value: 1e9, expected: '1 G' },
      { value: 1e12, expected: '1 T' },
      { value: 1e15, expected: '1 P' },
      { value: 1e18, expected: '1 E' },
      { value: 1000e-18, expected: '1 f' },
      { value: 1000e-15, expected: '1 p' },
      { value: 1000e-12, expected: '1 n' },
      { value: 1000e-9, expected: `1 ${MICRO}` },
      { value: 1000e-6, expected: '1 m' },
      { value: 1000e-3, expected: '1' },
      { value: 1000, expected: '1 k' },
      { value: 1000e3, expected: '1 M' },
      { value: 1000e6, expected: '1 G' },
      { value: 1000e9, expected: '1 T' },
      { value: 1000e12, expected: '1 P' },
      { value: 1000e15, expected: '1 E' },
      { value: 123e-3, expected: '123 m' },
      { value: 123, expected: '123' },
      { value: 1.230e-16, expected: '123 a' },
      { value: 1.230e-15, expected: '1.23 f' },
      { value: 1.230e-12, expected: '1.23 p' },
      { value: 1.230e-9, expected: '1.23 n' },
      { value: 1.230e-6, expected: `1.23 ${MICRO}` },
      { value: 1.230e-3, expected: '1.23 m' },
      { value: 1.23, expected: '1.23' },
      { value: 1.23e3, expected: '1.23 k' },
      { value: 1.23e6, expected: '1.23 M' },
      { value: 1.23e9, expected: '1.23 G' },
      { value: 1.23e12, expected: '1.23 T' },
      { value: 1.23e15, expected: '1.23 P' },
      { value: 1.23e18, expected: '1.23 E' },
    ]

    values.forEach(({ value, expected }) => {
      expect(format(value)).toBe(expected)
    })

  })

  test('Should format negative number', () => {

    const values = [
      { value: 1e-16, expected: '100 a' },
      { value: 1e-15, expected: '1 f' },
      { value: 1e-12, expected: '1 p' },
      { value: 1e-9, expected: '1 n' },
      { value: 1e-6, expected: `1 ${MICRO}` },
      { value: 1e-3, expected: '1 m' },
      { value: 1, expected: '1' },
      { value: 1e3, expected: '1 k' },
      { value: 1e6, expected: '1 M' },
      { value: 1e9, expected: '1 G' },
      { value: 1e12, expected: '1 T' },
      { value: 1e15, expected: '1 P' },
      { value: 1000e-18, expected: '1 f' },
      { value: 1000e-15, expected: '1 p' },
      { value: 1000e-12, expected: '1 n' },
      { value: 1000e-9, expected: `1 ${MICRO}` },
      { value: 1000e-6, expected: '1 m' },
      { value: 1000e-3, expected: '1' },
      { value: 1000, expected: '1 k' },
      { value: 1000e3, expected: '1 M' },
      { value: 1000e6, expected: '1 G' },
      { value: 1000e9, expected: '1 T' },
      { value: 1000e12, expected: '1 P' },
      { value: 123e-3, expected: '123 m' },
      { value: 123, expected: '123' },
      { value: 1.230e-16, expected: '123 a' },
      { value: 1.230e-15, expected: '1.23 f' },
      { value: 1.230e-12, expected: '1.23 p' },
      { value: 1.230e-9, expected: '1.23 n' },
      { value: 1.230e-6, expected: `1.23 ${MICRO}` },
      { value: 1.230e-3, expected: '1.23 m' },
      { value: 1.23, expected: '1.23' },
      { value: 1.23e3, expected: '1.23 k' },
      { value: 1.23e6, expected: '1.23 M' },
      { value: 1.23e9, expected: '1.23 G' },
      { value: 1.23e12, expected: '1.23 T' },
      { value: 1.23e15, expected: '1.23 P' },
      { value: 1.23e18, expected: '1.23 E' },
    ]

    values.forEach(({ value, expected }) => {
      expect(format(-value)).toBe(`-${expected}`)
    })

  })

})
