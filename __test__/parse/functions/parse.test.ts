import { parse } from '../../../src'

describe('parse function', () => {

  test('should be a function', () => {
    expect(parse).toBeInstanceOf(Function)
  })

  test.todo('should internally call createParser with given options')

})
