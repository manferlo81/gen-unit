import { CreateFormatterOptions, TableItem } from "./types";

function sortByPower(a: TableItem, b: TableItem) {
  return b.power - a.power;
}

const defaultTable = "T:12;G:9;M:6;K:3;:0;m:-3;\u00b5:-6;n:-9;p:-12;f:-15"
  .split(";")
  .map<TableItem>((s) => {
    const [pre, pow] = s.split(":");
    return { power: +pow, pre };
  })
  .sort(sortByPower);

function findUnit(pow: number, table: TableItem[]) {
  return table.find(({ power }) => power <= pow) || table[table.length - 1];
}

export function createFormatter(options?: CreateFormatterOptions) {

  const {
    unit: unitOp,
    table: tableOp,
    dec: decOp,
    fixed,
  } = options || {} as CreateFormatterOptions;

  if (decOp != null && typeof decOp !== "number") {
    throw new TypeError("invalid \"dec\" option.");
  }

  const unit = unitOp || "";
  const table = tableOp || defaultTable;
  const dec = (decOp != null) ? decOp : 4;

  return (value: number): string => {
    const unitObj = findUnit(value ? Math.floor(Math.log10(Math.abs(value))) : 0, table);
    const val = value / 10 ** unitObj.power;
    const mul = 10 ** dec;
    const rounded = fixed ? val.toFixed(dec) : (Math.round(val * mul) / mul);
    const wholeUnit = unitObj.pre + unit;
    return `${rounded}${wholeUnit ? ` ${wholeUnit}` : ""}`;
  };

}
