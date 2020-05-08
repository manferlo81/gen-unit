const reg = /^\s*(-?[.\d]+(?:e[+-]?\d+)?)\s*(\w*)\s*$/;

export function capture(input: string): [string, string] | null {

  const result = reg.exec(input);

  if (!result) {
    return null;
  }

  const [, valueAsStr, unit] = result;
  return [valueAsStr, unit];

}
