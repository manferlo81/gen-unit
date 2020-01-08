import { TableItem } from './types'

export interface CreateParserOptions extends DeprecatedCreateParserOptions {
  unit?: string;
}

export type ParseFunction = (input: string | number | object) => number

// DEPRECATED

interface DeprecatedCreateParserOptions {
  table?: TableItem[];
}
