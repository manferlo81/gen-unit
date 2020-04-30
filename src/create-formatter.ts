import { createRounder } from './create-rounder'
import { createUnitFinder } from './create-unit-finder'
import { formatOutput } from './format-output'
import { CreateFormatterOptions, FormatFunction, FormatOutputFunction, RoundFunction } from './formatter-types'
import { isFunction } from './is-function'

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
    : formatOutput

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
