const table = [
  { pre: "f", power: -15 },
  { pre: "p", power: -12 },
  { pre: "n", power: -9 },
  { pre: "u", power: -6 },
  { pre: "m", power: -3 },
  { pre: "k", power: 3 },
  { pre: "K", power: 3 },
  { pre: "M", power: 6 },
  { pre: "meg", power: 6 },
  { pre: "G", power: 9 },
  { pre: "T", power: 12 },
].sort((a, b) => b.pre.length - a.pre.length);

// const table2 = {
//   f: -15,
//   p: -12,
//   n: -9,
//   u: -6,
//   m: -3,
//   k: 3,
//   K: 3,
//   M: 6,
//   meg: 6,
//   G: 9,
//   T: 12,
// };

function jjj(val: number, unit: string, base?: string) {

  if (base && unit === base) {
    return val;
  }

  for (const { pre, power } of table) {
    if (unit === pre || (base && unit === (pre + base))) {
      return val * 10 ** power;
    }
  }

  return null;

}

interface CreateParserOptions {
  unit?: string;
}

export function createParser({ unit: base }: CreateParserOptions) {

  return (input: string | number) => {

    const asNum = +input;

    if (!isNaN(asNum)) {
      return asNum;
    }

    const result = /^\s*(\-?\d+\.?\d*)\s*(\w*)\s*$/.exec(`${input}`);

    if (!result) {
      return null;
    }

    const [, value, unit] = result;

    return jjj(+value, unit, base);

  };

}
