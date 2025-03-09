import { MICRO, parse } from '../../src'

describe('parse', () => {

  test.each([
    ['E', 'Exa', 1e18],
    ['P', 'Peta', 1e15],
    ['T', 'Tera', 1e12],
    ['G', 'Giga', 1e9],
    ['meg', 'Mega', 1e6],
    ['M', 'Mega', 1e6],
    ['K', 'Kilo', 1e3],
    ['k', 'Kilo', 1e3],
    ['m', 'milli', 1e-3],
    [MICRO, 'micro', 1e-6],
    ['u', 'micro', 1e-6],
    ['n', 'nano', 1e-9],
    ['p', 'pico', 1e-12],
    ['f', 'femto', 1e-15],
    ['a', 'atto', 1e-18],
  ])('Should parse unit "%s" (%s)', (unit, _desc, mul) => {
    const value = 1.2
    expect(parse(`${value}${unit}`)).toBeCloseTo(value * mul, 10)
  })

})
