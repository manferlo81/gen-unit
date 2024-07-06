export function error(message: string) {
  return new TypeError(message);
}

export function errorRemoved(option: string, replacement: string) {
  return error(`Option "${option}" has been removed. Use "${replacement}" option instead.`);
}
