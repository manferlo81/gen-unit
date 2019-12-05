export interface TableItem {
  pre: string;
  power: number;
}

export interface CreateParserOptions {
  unit?: string;
  table?: TableItem[];
}

export interface CreateFormatterOptions extends CreateParserOptions {
  dec?: number | string;
  fixed?: boolean;
}

export type NumberRounderFunction = (num: number) => string;
