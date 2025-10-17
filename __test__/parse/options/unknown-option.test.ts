import { createParser } from '../../../src'

describe('parse invalid option', () => {

  test('should throw if removed option used', () => {
    const removedOptions = [
      { name: 'table', value: [] },
    ]
    removedOptions.forEach(({ name, value }) => {
      const callCreateParser = () => createParser({ [name]: value })
      expect(callCreateParser).toThrow(`Option "${name}" has been removed`)
    })
  })

  test('should throw if unknown option used', () => {
    const unknownOptions = [
      'unknown',
      'unknown-option',
      'any-option',
      'anyOption',
    ]
    unknownOptions.forEach((name) => {
      const callCreateParser = () => createParser({ [name]: null })
      expect(callCreateParser).toThrow(`Unknown option "${name}"`)
    })
  })

})
