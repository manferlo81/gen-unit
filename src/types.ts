export interface TableItem {
  pre: string;
  power: number;
}

export interface RoundOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type RoundNumberFunction = (num: number) => string | number;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeprecatedCreateParserOptions { }

export interface CreateParserOptions extends DeprecatedCreateParserOptions {
  unit?: string;
  table?: TableItem[];
}

interface DeprecatedCreateFormatterOptions {
  dec?: number | string;
  fixed?: boolean;
}

export interface CreateFormatterOptions extends DeprecatedCreateFormatterOptions {
  unit?: string;
  table?: TableItem[];
  round?: RoundOptions | RoundNumberFunction;
}

export type FindUnitFunction = (value: number) => ({ div: number; pre: string })

export type ParseFunction = (input: string | number | object) => (number | null)
export type FormatFunction = (value: number) => string
