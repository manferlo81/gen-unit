import createRounder from './create-rounder'
import { CreateFormatterOptions, FormatFunction, RoundFunction, FormatOutputFunction, FindUnitFunction } from './formatter-types'
import isFunction from './is-function'
import createLegacyUnitFinder from './create-unit-finder-legacy'
import createUnitFinder from './create-unit-finder'
import sortFindUnitArray from './sort-find-unit-array'

function format(value: string | number, pre: string, unit: string): string {
  const wholeUnit = `${pre}${unit}`
  return `${value}${wholeUnit ? ` ${wholeUnit}` : ''}`
}

export function createFormatter(options?: CreateFormatterOptions): FormatFunction {

  const op = options || {} as CreateFormatterOptions

  const {
    unit,
    find,
    round,
    output,
    dec,
    fixed,
  } = op

  const getUnit = isFunction(unit) ? unit : (): string => (unit || '')

  const findUnit = isFunction<FindUnitFunction>(find)
    ? find
    : Array.isArray(find)
      ? createUnitFinder(
        sortFindUnitArray(find),
        { pre: '', div: 1 },
      )
      : createLegacyUnitFinder(op.table)

  const roundNum = isFunction<RoundFunction>(round)
    ? round
    : createRounder(
      typeof round === 'number'
        ? { dec: round }
        : (round || { dec, fixed }),
    )

  const fmt = isFunction<FormatOutputFunction>(output)
    ? output
    : format

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
