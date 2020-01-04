export interface TableItem {
  pre: string;
  power: number;
}

interface DeprecatedCreateParserOptions {
  table?: TableItem[];
}

export interface CreateParserOptions extends DeprecatedCreateParserOptions {
  unit?: string;
}

export type ParseFunction = (input: string | number | object) => number

interface DeprecatedCreateFormatterOptions {
  dec?: number | string;
  fixed?: boolean;
  table?: TableItem[];
}

export interface RoundOptions {
  dec?: number | string;
  fixed?: boolean;
}

export interface CreateFormatterOptions extends DeprecatedCreateFormatterOptions {
  unit?: string;
  round?: RoundOptions | RoundNumberFunction;
}

export type FindUnitFunction = (value: number) => ({ div: number; pre: string })
export type RoundNumberFunction = (num: number) => (string | number);

export type FormatFunction = (value: number) => string
