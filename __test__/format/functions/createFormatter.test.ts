import { createFormatter } from '../../../src'

describe('createFormatter function', () => {

  test('should be a function', () => {
    expect(createFormatter).toBeInstanceOf(Function)
  })

  test('should create a function', () => {
    const format = createFormatter()
    expect(format).toBeInstanceOf(Function)
  })

  test('should create a function with options', () => {
    const format = createFormatter({ unit: 'm' })
    expect(format).toBeInstanceOf(Function)
  })

})
