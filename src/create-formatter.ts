interface CreateFormatterOptions {
  unit?: string;
  dec?: number;
  fixed?: boolean;
}

const table = [
  { power: 12, pre: "T" },
  { power: 9, pre: "G" },
  { power: 6, pre: "M" },
  { power: 3, pre: "K" },
  { power: 0, pre: "" },
  { power: -3, pre: "m" },
  { power: -6, pre: "u" },
  { power: -9, pre: "n" },
  { power: -12, pre: "p" },
  { power: -15, pre: "f" },
].sort((a, b) => b.power - a.power);

function findUnit(pow: number) {
  return table.find(({ power }) => power <= pow) || table[table.length - 1];
}

export function createFormatter({ unit = "", dec = 4, fixed }: CreateFormatterOptions = {}) {

  return (value: number): string => {
    const unitObj = findUnit(Math.floor(Math.log10(value)));
    const val = value / 10 ** unitObj.power;
    const mul = 10 ** dec;
    const rounded = fixed ? val.toFixed(dec) : (Math.round(val * mul) / mul);
    return `${rounded} ${unitObj.pre + unit}`;
  };

}
