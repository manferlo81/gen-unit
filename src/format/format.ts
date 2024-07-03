import { type CreateFormatterOptions } from './types';
import { createFormatter } from './formatter';


export function format(value: number, options?: CreateFormatterOptions): string {
  return createFormatter(options)(value);
}
