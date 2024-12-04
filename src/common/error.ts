export function error(message: string): TypeError {
  return new TypeError(message);
}

export function rangeError(message: string): RangeError {
  return new RangeError(message);
}

export function errorInvalidOption(optionName: string): TypeError {
  return error(`Invalid "${optionName}" option`);
}
