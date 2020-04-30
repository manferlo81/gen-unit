import { isFunction } from '../tools/is-function'
import { createUnitFinder } from './find-unit'
import { createRounder } from './round'
import { CreateFormatterOptions, FormatFunction, FormatOutputFunction, RoundFunction } from './types'

function defaultFormat(value: string | number, pre: string, unit: string): string {
  const wholeUnit = `${pre}${unit}`
  return `${value}${wholeUnit ? ` ${wholeUnit}` : ''}`
}

export function createFormatter(options?: CreateFormatterOptions): FormatFunction {

  const {
    unit,
    find,
    round,
    output,
    dec: deprecatedDec,
    fixed: deprecatedFixed,
    table: deprecatedTable,
  } = options || {} as CreateFormatterOptions

  const getUnit = isFunction(unit) ? unit : (): string => (unit || '')

  const findUnit = createUnitFinder(find, deprecatedTable)

  const roundNum = isFunction<RoundFunction>(round)
    ? round
    : createRounder(
      typeof round === 'number'
        ? { dec: round }
        : (round || { dec: deprecatedDec, fixed: deprecatedFixed }),
    )

  const fmt = isFunction<FormatOutputFunction>(output)
    ? output
    : defaultFormat

  return (value: number): string => {
    const unitObj = findUnit(value)
    const { pre } = unitObj
    const value2 = value / unitObj.div
    const rounded = roundNum(value2)
    return fmt(
      rounded,
      pre,
      getUnit(value2, rounded, pre),
    )
  }

}

export function format(value: number, options?: CreateFormatterOptions): string {
  return createFormatter(options)(value)
}
