import { error } from './error'

export function validateOptionsNames<O extends object, K extends keyof O>(options: O, valid: K[], removed: Record<string, K>): Pick<O, K>
export function validateOptionsNames<O extends Record<string, unknown>>(options: O, valid: string[], removed: Record<string, string>): O
export function validateOptionsNames<O extends Record<string, unknown>>(options: O, valid: string[], removed: Record<string, string>): O {

  // key input options
  const inputOptionNames = Object.keys(options)
  const removedOptionNames = Object.keys(removed)

  // throw if removed option present
  const removedOptionName = inputOptionNames.find((optionName) => removedOptionNames.includes(optionName))
  if (removedOptionName) throw error(`Option "${removedOptionName}" has been removed. Use "${removed[removedOptionName]}" option instead.`)

  // throw if unknown option present
  const unknownOptionName = inputOptionNames.find((optionName) => !valid.includes(optionName))
  if (unknownOptionName) throw error(`Unknown option "${unknownOptionName}".`)

  // return options as valid
  return options

}
