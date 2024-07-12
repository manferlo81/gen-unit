import { createFormatter } from './create-formatter';
import type { CreateFormatterOptions } from './types';

export function format(value: number, options?: CreateFormatterOptions): string {
  return createFormatter(options)(value);
}
