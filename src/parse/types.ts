import { DeprecatedTableItem } from '../types';

export type FindMultiplierFunction = (unit: string) => number

export interface CreateParserOptions extends DeprecatedCreateParserOptions {
  unit?: string;
}

export type ParseInput = string | number | object
export type ParseFunction = (input: ParseInput) => number

// DEPRECATED

interface DeprecatedCreateParserOptions {
  table?: DeprecatedTableItem[];
}
