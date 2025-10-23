import { validateOptionsNames } from '../../src/common/validate-options'

describe('validateOptionsNames function', () => {

  const validate = (options: Record<string, unknown>) => validateOptionsNames(
    options,
    ['validOne', 'validTwo', 'validThree'],
    { removedOne: 'replacedOne', removedTwo: 'replacedTwo' },
  )

  test('should throw if removed option used', () => {
    const removedOptions = [
      'removedOne',
      'removedTwo',
    ]
    removedOptions.forEach((removedOptionName) => {
      const exec = () => {
        const options = { [removedOptionName]: null }
        return validate(options)
      }
      expect(exec).toThrow(`Option "${removedOptionName}" has been removed`)
    })
  })

  test('should throw if unknown option used', () => {
    const unknownOptions = [
      'unknown',
      'unknown-option',
      'any-option',
      'anyOption',
    ]
    unknownOptions.forEach((unknownOptionName) => {
      const exec = () => {
        const options = { [unknownOptionName]: null }
        return validate(options)
      }
      expect(exec).toThrow(`Unknown option "${unknownOptionName}"`)
    })
  })

  test('should return input options if valid', () => {
    const validOptions = {
      validOne: null,
      validTwo: null,
      validThree: null,
    }
    expect(validate(validOptions)).toBe(validOptions)
  })

})
