import type { ExponentFindItem, ExponentFindItems } from '../../src'
import { noDuplicates } from '../../src/common/no-duplicates'

describe('noDuplicates function', () => {

  const noDuplicatedPrefixes = (items: ExponentFindItems) => noDuplicates(items, 'pre', 'prefix')
  const noDuplicatedExponents = (items: ExponentFindItems) => noDuplicates(items, 'exp', 'exponent')

  test('should throw if input has duplicated prefixes', () => {

    const duplicatedPrefixInputs: ExponentFindItems[] = [
      [
        { pre: 'k', exp: 1 },
        { pre: 'k', exp: 2 },
      ],
      [
        { pre: 'k', exp: 1 },
        { pre: 'k', exp: 2 },
        { pre: 'G', exp: 3 },
        { pre: 'T', exp: 4 },
      ],
      [
        { pre: 'k', exp: 1 },
        { pre: 'M', exp: 2 },
        { pre: 'M', exp: 3 },
        { pre: 'T', exp: 4 },
      ],
      [
        { pre: 'k', exp: 1 },
        { pre: 'M', exp: 2 },
        { pre: 'G', exp: 3 },
        { pre: 'G', exp: 4 },
      ],
      [
        { pre: 'k', exp: 1 },
        { pre: 'M', exp: 2 },
        { pre: 'G', exp: 3 },
        { pre: 'k', exp: 4 },
      ],
    ]

    duplicatedPrefixInputs.forEach((input) => {
      const check = () => noDuplicatedPrefixes(input)
      expect(check).toThrow('Duplicated prefix')
    })

  })

  test('should throw if input has duplicated exponents', () => {

    const duplicatedExponentInputs: ExponentFindItems[] = [
      [
        { pre: 'k', exp: 1 },
        { pre: 'M', exp: 1 },
      ],
      [
        { pre: 'k', exp: 1 },
        { pre: 'M', exp: 1 },
        { pre: 'G', exp: 3 },
        { pre: 'T', exp: 4 },
      ],
      [
        { pre: 'k', exp: 1 },
        { pre: 'M', exp: 2 },
        { pre: 'G', exp: 2 },
        { pre: 'T', exp: 4 },
      ],
      [
        { pre: 'k', exp: 1 },
        { pre: 'M', exp: 2 },
        { pre: 'G', exp: 3 },
        { pre: 'T', exp: 3 },
      ],
      [
        { pre: 'k', exp: 1 },
        { pre: 'M', exp: 2 },
        { pre: 'G', exp: 3 },
        { pre: 'T', exp: 1 },
      ],
    ]

    duplicatedExponentInputs.forEach((input) => {
      const check = () => noDuplicatedExponents(input)
      expect(check).toThrow('Duplicated exponent')
    })

  })

  test('should return input if no duplicated prefixes', () => {

    const prefixesList: string[][] = [
      [''],
      ['k', 'm'],
      ['k', 'M', 'G'],
      ['k', 'M', 'G', 'T', 'm', 'u', 'n', 'p'],
    ]

    prefixesList.forEach((prefixes) => {

      // create items with the same exponent as the exponent won't be checked
      const items = prefixes.map<ExponentFindItem>((pre) => ({ pre, exp: 0 }))

      const output = noDuplicatedPrefixes(items)
      expect(output).toBe(items)

    })

  })

  test('should return input if no duplicated exponents', () => {

    const exponentsList: number[][] = [
      [0],
      [1, 2],
      [1, 2, 3],
      [0, 1, 2, 3, 4, -4, -3, -2, -1],
    ]

    exponentsList.forEach((exponents) => {

      // create items with the same prefix as the prefix won't be checked
      const items = exponents.map<ExponentFindItem>((exp) => ({ pre: 'x', exp }))

      const output = noDuplicatedExponents(items)
      expect(output).toBe(items)

    })

  })

})
