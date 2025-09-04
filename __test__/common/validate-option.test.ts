import { validateOptions } from '../../src/common/validate-options'

describe('validateOptions function', () => {

  const validate = (options: Record<string, unknown>) => validateOptions(
    options,
    ['validOne', 'validTwo', 'validThree'],
    { removedOne: 'replacedOne', removedTwo: 'replacedTwo' },
  )

  test('Should throw if removed option used', () => {
    const removedOptions = [
      'removedOne',
      'removedTwo',
    ]
    removedOptions.forEach((removedOptionName) => {
      const callValidateWithRemovedOption = () => validate({ [removedOptionName]: null })
      expect(callValidateWithRemovedOption).toThrow(`Option "${removedOptionName}" has been removed`)
    })
  })

  test('Should throw if unknown option used', () => {
    const unknownOptions = [
      'unknown',
      'unknown-option',
      'any-option',
      'anyOption',
    ]
    unknownOptions.forEach((unknownOptionName) => {
      const callValidateWithUnknownOption = () => validate({ [unknownOptionName]: null })
      expect(callValidateWithUnknownOption).toThrow(`Unknown option "${unknownOptionName}"`)
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
