import { isFiniteNumber, isFunction, isNullish } from '../common/is'
import { validateOptionsNames } from '../common/validate-options'
import type { DeprecatedFormatGetUnitFunction } from '../deprecated-types'
import { REMOVED_FORMATTER_OPTIONS, VALID_FORMATTER_OPTIONS } from './constants'
import { createUnitFinder } from './find-unit'
import { createOutputFormatter } from './output'
import { createRounder } from './round'
import type { Formatter, FormatterOptions, FormatterOptionsWithoutUnit, FormatterOptionsWithUnit, FormatUnitOption } from './types'

/** @deprecated */

function deprecated_createGetUnit(unit: FormatUnitOption | DeprecatedFormatGetUnitFunction): DeprecatedFormatGetUnitFunction {

  // return unit option if it's a function (deprecated)
  if (isFunction(unit)) return unit

  // return a function returning normalized unit
  const normalizedUnit = unit ?? ''
  return () => normalizedUnit

}

/**
 * Create a formatter function
 *
 * @param options create formatter options
 */
export function createFormatter(options: FormatterOptionsWithoutUnit): Formatter
export function createFormatter<U extends string>(options: FormatterOptionsWithUnit<U>): Formatter

export function createFormatter(options?: FormatterOptions): Formatter
export function createFormatter(options: FormatterOptions = {}): Formatter {

  const validOptions = validateOptionsNames(
    options,
    VALID_FORMATTER_OPTIONS,
    REMOVED_FORMATTER_OPTIONS,
  )

  const { unit, find, round, output } = validOptions

  const getUnit = deprecated_createGetUnit(unit)
  const findUnit = createUnitFinder(find)
  const roundNum = createRounder(round)
  const formatOutput = createOutputFormatter(output)

  const formatWithPre = (value: number, pre: string) => {
    const rounded = roundNum(value)
    const computedUnit = getUnit(value, rounded, pre)
    return formatOutput(
      rounded,
      pre,
      computedUnit,
    )
  }

  return (value: number): string => {

    // return value as string if it's not finite
    if (!isFiniteNumber(value)) return `${value}`

    // find unit
    const item = findUnit(value)

    // return formatted value * 1 if can't find prefix and multiplier
    if (isNullish(item)) return formatWithPre(value, '')

    // get prefix and multiplier
    const { pre, mul: divisor } = item

    // return formatted value
    return formatWithPre(value / divisor, pre)

  }

}
