export interface TableItem {
  pre: string;
  power: number;
}

export interface RoundOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type RoundNumberFunction = (num: number) => string | number;

export interface CreateParserOptions {
  unit?: string;
  table?: TableItem[];
}

export interface CreateFormatterOptions {
  unit?: string;
  table?: TableItem[];
  dec?: number | string;
  fixed?: boolean;
  round?: RoundOptions | RoundNumberFunction;
}

export type ParseFunction = (input: string | number | object) => (number | null)
export type FormatFunction = (value: number) => string
