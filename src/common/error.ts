export function error(message: string) {
  return new TypeError(message);
}

export function errorRemoved(removed: string, replacement: string) {
  return error(`Option "${removed}" has been removed. Use "${replacement}" option instead.`);
}
