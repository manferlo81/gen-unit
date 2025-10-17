import { createParser } from '../../../src'

describe('parse with no options', () => {

  const parse = createParser({})

  test('should return NaN on invalid input', () => {

    const nonStrings = [
      null,
      undefined,
      Infinity,
      -Infinity,
      NaN,
    ]

    const invalidStrings = [
      '',
      'null',
      'undefined',
      'true',
      'false',
      'non-numeric',
      '10.3.4',
      '10 x',
      'Infinity k',
      '-Infinity m',
    ]

    const invalidValues = [
      ...nonStrings,
      ...invalidStrings,
      ...invalidStrings.map((value) => ({ toString: () => value })),
    ]

    const parse = createParser({})

    invalidValues.forEach((value) => {
      expect(parse(value)).toBeNaN()
    })

  })

  test('should parse number', () => {

    const values = [
      0,
      0.,
      .0,
      1,
      -1,
      123,
      0.1,
      2.3,
      -.3,
      .2,
      2.,
      1.2e3,
      1.2e+3,
      1.2e-3,
    ]

    const parse = createParser({})

    values.forEach((value) => {
      expect(parse(value)).toBe(value)
    })

  })

  test('should parse numeric string', () => {

    const numericValues = [
      '0',
      '1',
      '10',
      '123',
      '0.0',
      '0.1',
      '123.4',
      '-123.4',
      '.4',
      '-.4',
      '2.e-1',
      '-2.e-1',
      '1e3',
      '1E3',
      '10e-3',
      '10E-3',
      '10e+3',
      '3e-6',
      '-123e-6',
      '123e+6',
    ]

    numericValues.forEach((value) => {
      const result = parse(value)
      expect(result).not.toBeNaN()
      expect(result).toBeCloseTo(+value, 8)
    })

  })

  test('should parse numeric string with unit', () => {

    const values = [
      { value: '12 k', expected: 12e3 },
      { value: '12 m', expected: 12e-3 },
      { value: '100e-3 m', expected: 100e-6 },
      { value: '100e-3 K', expected: 100 },
      { value: '-100e3 m', expected: -100 },
      { value: '100e+3 m', expected: 100 },
      { value: '2e3 m', expected: 2 },
      { value: '2E3 m', expected: 2 },
      { value: '2e-3 k', expected: 2 },
      { value: '2E-3 k', expected: 2 },
    ]

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected, 8)
    })

  })

  test('should ignore extra spaces', () => {

    const values = [
      { value: '10u', expected: 10e-6 },
      { value: '10 u', expected: 10e-6 },
      { value: '10    u', expected: 10e-6 },
      { value: '   10    u   ', expected: 10e-6 },
    ]

    values.forEach(({ value, expected }) => {
      expect(parse(value)).toBeCloseTo(expected)
    })

  })

  test('should return 0 without checking for units', () => {

    const values = [
      '0f',
      '0p',
      '0n',
      '0u',
      '0m',
      '0',
      '0k',
      '0K',
      '0meg',
      '0M',
      '0G',
      '0T',
    ]

    values.forEach((value) => {
      expect(parse(value)).toBe(0)
    })

  })

  test('should return NaN if value is zero and unit not found', () => {
    expect(parse('0x')).toBeNaN()
    expect(parse('0l')).toBeNaN()
  })

})
