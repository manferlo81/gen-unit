import type { CreateFormatterOptions } from './types';

type CreateFormatterValidOptionName = keyof CreateFormatterOptions;
type CreateFormatterRemovedOptionName = 'table' | 'dec' | 'fixed';

export const validFormatterOptions: CreateFormatterValidOptionName[] = ['unit', 'find', 'round', 'output'];

export const removedFormatterOptions: Record<CreateFormatterRemovedOptionName, CreateFormatterValidOptionName> = {
  table: 'find',
  dec: 'round',
  fixed: 'round',
};
