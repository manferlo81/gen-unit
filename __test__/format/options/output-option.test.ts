import { createFormatter, CreateFormatterOptions, CreateFormatterOptionsWithUnit, format as oneStepFormat } from '../../../src'

describe('formatter "output" option', () => {

  test('Should throw if invalid "output" option', () => {

    const invalidOutputOptions = [
      0,
      1,
      '',
      'string',
      true,
      false,
    ]

    invalidOutputOptions.forEach((option) => {
      expect(() => createFormatter({ output: option as never })).toThrow('Invalid "output" option')
    })

  })

  describe('"output" option as object', () => {

    test('Should default to 1 space if nullish space given or none provided', () => {

      const spaces = [
        null,
        undefined,
      ]

      expect(oneStepFormat(10e3, { output: {} })).toBe('10 k')

      spaces.forEach((space) => {
        expect(oneStepFormat(10e3, { output: { space } })).toBe('10 k')
      })

    })

    test('Should format with given space', () => {

      const spaces = [
        '',
        '-',
        '--',
      ]

      spaces.forEach((space) => {
        expect(oneStepFormat(10e3, { output: { space } })).toBe(`10${space}k`)
      })

    })

    test('Should throw on invalid number of spaces', () => {

      const invalidSpaces = [
        -1,
        NaN,
        Infinity,
        -Infinity,
        0 / 0,
        0 / +0,
        0 / -0,
        1 / 0,
        1 / +0,
        1 / -0,
        -1 / 0,
        -1 / +0,
        -1 / -0,
      ]

      invalidSpaces.forEach((space) => {
        const create = () => createFormatter({ output: { space } })
        expect(create).toThrow(RangeError)
        expect(create).toThrow('Can\'t format output with')
      })

    })

    test('Should format with given number of spaces', () => {

      const spaces = [
        0,
        1,
        2,
      ]

      spaces.forEach((space) => {
        expect(oneStepFormat(10e3, { output: { space } })).toBe(`10${' '.repeat(space)}k`)
      })

    })

  })

  describe('"output" option as function', () => {

    test('Should use "output" option', () => {
      const options: CreateFormatterOptions = {
        output: (value, pre) => `${value}--${pre}`,
      }
      expect(oneStepFormat(10e-3, options)).toBe('10--m')
    })

    test('Should use "output" option with unit', () => {
      const options: CreateFormatterOptionsWithUnit<'g'> = {
        unit: 'g',
        output: (value, pre, unit) => `${value}-${pre}-${unit}`,
      }
      expect(oneStepFormat(10e-3, options)).toBe('10-m-g')
    })

    test('Should use invalid returned value and convert it to string anyway', () => {
      const invalidFunctions = [
        (value: string | number) => value,
        (value: string | number) => ({ toString: () => value }),
      ]
      invalidFunctions.forEach((invalid) => {
        const options: CreateFormatterOptions = {
          unit: 'g',
          output: invalid as never,
        }
        expect(oneStepFormat(10e-3, options)).toBe('10')
      })
    })

  })

})
