import { MICRO } from '../../src'
import { DEFAULT_MATCH_PATTERN } from '../../src/parse/constants'

describe('defaultMatchPattern constant', () => {

  const integersStrings = [
    '0',
    '100',
    '-0',
    '-10',
    '-1',
  ]

  const realNumberStrings = [
    '3.3',
    '4.',
    '.1',
    '-7.1',
    '-.2',
    '-1.',
  ]

  const exponentialNumberStrings = [
    '1e3',
    '1e+3',
    '1e-3',
    '-5e2',
    '-5e+2',
    '-5e-2',
    '.3e6',
    '.3e+6',
    '.3e-6',
    '-5.e2',
    '-5.e+2',
    '-5.e-2',
  ]

  const validValues = [
    ...integersStrings,
    ...realNumberStrings,
    ...exponentialNumberStrings,
  ]

  const units = [
    's',
    'mm',
    'anything',
    MICRO,
    `${MICRO}m`,
  ]

  const match = (value: string): string[] | null => {
    const matched = DEFAULT_MATCH_PATTERN.exec(value)
    return matched ? matched.slice(1) : null
  }

  test('should match integers', () => {
    integersStrings.forEach((integer) => {
      expect(match(integer)).toEqual([integer, ''])
    })
  })

  test('should match real numbers', () => {
    realNumberStrings.forEach((realNumber) => {
      expect(match(realNumber)).toEqual([realNumber, ''])
    })
  })

  test('should match exponential notation number', () => {
    exponentialNumberStrings.forEach((exponential) => {
      expect(match(exponential)).toEqual([exponential, ''])
    })
  })

  test('should match unit part', () => {
    units.forEach((unit) => {
      validValues.forEach((value) => {
        expect(match(`${value}${unit}`)).toEqual([value, unit])
      })
    })
  })

  test('should ignore dangling spaces', () => {
    units.forEach((unit) => {
      validValues.forEach((value) => {
        expect(match(`     ${value}${unit}`)).toEqual([value, unit])
        expect(match(`${value}     ${unit}`)).toEqual([value, unit])
        expect(match(`${value}${unit}     `)).toEqual([value, unit])
        expect(match(`     ${value}      ${unit}`)).toEqual([value, unit])
        expect(match(`${value}      ${unit}     `)).toEqual([value, unit])
        expect(match(`      ${value}      ${unit}     `)).toEqual([value, unit])
      })
    })
  })

})
