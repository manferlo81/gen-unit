import { MICRO, parse } from '../../src'

describe('default prefixes', () => {

  const prefixes = [
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
  ] as Array<[string, string, number]>

  prefixes.forEach(([prefix, description, multiplier]) => {
    test(`Should parse unit prefix "${prefix}" (${description})`, () => {
      const values = [
        1.2,
        0.1,
        -2,
      ]
      values.forEach((value) => {
        expect(parse(`${value}${prefix}`)).toBeCloseTo(value * multiplier, 8)
      })
    })
  })

  const unit = 'm'

  prefixes.forEach(([prefix, description, multiplier]) => {
    test(`Should parse unit prefix "${prefix}" (${description}) with unit`, () => {
      const values = [
        1.2,
        0.1,
        -2,
      ]
      values.forEach((value) => {
        expect(parse(`${value}${prefix}${unit}`, { unit })).toBeCloseTo(value * multiplier, 8)
      })
    })
  })

})
