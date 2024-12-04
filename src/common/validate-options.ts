import { error } from './error';

export function validateOptions<O extends Record<string, unknown>, K extends keyof O>(options: O, valid: K[], removed: Record<string, string>): Pick<O, K>;
export function validateOptions<O extends Record<string, unknown>>(options: O, valid: string[], removed: Record<string, string>): O;
export function validateOptions<O extends Record<string, unknown>>(options: O, valid: string[], removed: Record<string, string>): O {

  // key input options
  const optionsNames = Object.keys(options);
  const removedOptionNames = Object.keys(removed);

  // throw if removed option present
  const removedOptionName = optionsNames.find((optionName) => removedOptionNames.includes(optionName));
  if (removedOptionName) throw error(`Option "${removedOptionName}" has been removed. Use "${removed[removedOptionName]}" option instead.`);

  // throw if unknown option present
  const unknownOptionName = optionsNames.find((optionName) => !valid.includes(optionName));
  if (unknownOptionName) throw error(`Unknown option "${unknownOptionName}".`);

  // return options as valid
  return options;

}
