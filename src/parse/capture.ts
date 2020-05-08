const reg = /^\s*(-?[.\d]+(?:e[+-]?\d+)?)\s*(\w*)\s*$/;

export function capture(asString: string): [string, string] | null {

  const result = reg.exec(asString);

  if (!result) {
    return null;
  }

  const [, valueAsStr, unit] = result;
  return [valueAsStr, unit];

}
