const reg = /^\s*(-?\d*\.?\d*(?:e[+-]?\d+)?)\s*([a-zA-Z\u00b5]*)\s*$/i;

type InputCaptured = [value: string, wholeUnit: string];

export function capture(input: string): InputCaptured | null {

  // execute RegExp against input
  const result = reg.exec(input);

  // if it doesn't match, return null
  if (!result) {
    return null;
  }

  // return captured value & unit
  return result.slice(1, 3) as InputCaptured;
  // const [, value, wholeUnit] = result;
  // return [value, wholeUnit];

}
