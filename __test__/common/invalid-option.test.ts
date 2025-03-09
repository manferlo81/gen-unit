import { validateOptions } from '../../src/common/validate-options'

describe('invalid options', () => {

  const validate = (options: Record<string, unknown>) => validateOptions(
    options,
    ['validOne', 'validTwo', 'validThree'],
    { removedOne: 'replacedOne', removedTwo: 'replacedTwo' },
  )

  test('Should throw if removed option used', () => {
    const unknownOptions = [
      'removedOne',
      'removedTwo',
    ]
    unknownOptions.forEach((optionName) => {
      const callCreateFormatterWithUnknownOption = () => validate({ [optionName]: null })
      expect(callCreateFormatterWithUnknownOption).toThrow(`Option "${optionName}" has been removed`)
    })
  })

  test('Should throw if unknown option used', () => {
    const unknownOptions = [
      'unknown',
      'unknown-option',
      'any-option',
      'anyOption',
    ]
    unknownOptions.forEach((optionName) => {
      const callCreateFormatterWithUnknownOption = () => validate({ [optionName]: null })
      expect(callCreateFormatterWithUnknownOption).toThrow(`Unknown option "${optionName}"`)
    })
  })

  test('Should return input options if valid', () => {
    const validOptions = {
      validOne: null,
      validTwo: null,
      validThree: null,
    }
    expect(validate(validOptions)).toBe(validOptions)
  })

})
