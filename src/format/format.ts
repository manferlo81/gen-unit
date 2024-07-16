import { createFormatter } from './create-formatter';
import type { CreateFormatterOptions, CreateFormatterOptionsWithUnit, FormatUnitOption } from './types';

export function format<U extends FormatUnitOption>(value: number, options?: CreateFormatterOptionsWithUnit<U>): string;
export function format(value: number, options?: CreateFormatterOptions): string;
export function format(value: number, options?: CreateFormatterOptions): string {
  return createFormatter(options)(value);
}
