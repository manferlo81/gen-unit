export function error(message: string) {
  return new TypeError(message);
}

export function rangeError(message: string) {
  return new RangeError(message);
}

export function errorInvalidOption(option: string) {
  return error(`Invalid "${option}" option`);
}

export function errorOptionRemoved(removed: string, replacement: string) {
  return error(`Option "${removed}" has been removed. Use "${replacement}" option instead.`);
}
