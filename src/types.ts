export interface TableItem {
  pre: string;
  power: number;
}

export interface CreateParserOptions {
  unit?: string;
  table?: TableItem[];
}

export interface RoundOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type RoundNumberFunction = (num: number) => string;

export interface CreateFormatterOptions {
  unit?: string;
  table?: TableItem[];
  dec?: number | string;
  fixed?: boolean;
  round?: RoundOptions | RoundNumberFunction;
}

export type Parser = (input: string | number | object) => (number | null)
export type Formatter = (value: number) => string
