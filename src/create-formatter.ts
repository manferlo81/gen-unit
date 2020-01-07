import createRounder from './create-rounder'
import createUnitFinder from './create-unit-finder'
import isFunction from './is-function'
import { CreateFormatterOptions, FormatFunction, RoundNumberFunction } from './types'

function format(value: string | number, pre: string, unit: string): string {
  const wholeUnit = `${pre}${unit}`
  return `${value}${wholeUnit ? ` ${wholeUnit}` : ''}`
}

export function createFormatter(options?: CreateFormatterOptions): FormatFunction {

  const {
    unit: unitOp,
    round: roundOp,
    table: deprecatedTable,
    dec: deprecatedDec,
    fixed: deprecatedFixed,
  } = options || {} as CreateFormatterOptions

  const unit = unitOp || ''
  const base = 10
  const findUnit = createUnitFinder(base, deprecatedTable)
  const round = isFunction<RoundNumberFunction>(roundOp)
    ? roundOp
    : createRounder(
      typeof roundOp === 'number'
        ? { dec: roundOp }
        : (roundOp || { dec: deprecatedDec, fixed: deprecatedFixed }),
    )

  return (value: number): string => {
    const unitObj = findUnit(value)
    return format(
      round(value / unitObj.div),
      unitObj.pre,
      unit,
    )
  }

}
