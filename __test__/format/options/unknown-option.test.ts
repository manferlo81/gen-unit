import { createFormatter } from '../../../src'

describe('formatter invalid options', () => {

  test('Should throw if removed option used', () => {
    const removedOptions = [
      { name: 'table', value: [] },
      { name: 'dec', value: 2 },
      { name: 'fixed', value: true },
    ]
    removedOptions.forEach(({ name, value }) => {
      const callCreateFormatter = () => createFormatter({ [name]: value })
      expect(callCreateFormatter).toThrow(`Option "${name}" has been removed`)
    })
  })

  test('Should throw if unknown option used', () => {
    const unknownOptions = [
      'unknown',
      'unknown-option',
      'any-option',
      'anyOption',
    ]
    unknownOptions.forEach((name) => {
      const callCreateFormatter = () => createFormatter({ [name]: null })
      expect(callCreateFormatter).toThrow(`Unknown option "${name}"`)
    })
  })

})
