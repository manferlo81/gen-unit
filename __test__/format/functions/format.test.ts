import { format } from '../../../src'

describe('format function', () => {

  test('should be a function', () => {
    expect(format).toBeInstanceOf(Function)
  })

  test.todo('should internally call createFormatter with given options')

})
