import { createParser } from '../../../src'

describe('createParser function', () => {

  test('should be a function', () => {
    expect(createParser).toBeInstanceOf(Function)
  })

  test('should create a function', () => {
    const parser = createParser()
    expect(parser).toBeInstanceOf(Function)
  })

  test('should create a function with options', () => {
    const parser = createParser({ unit: 'm' })
    expect(parser).toBeInstanceOf(Function)
  })

})
