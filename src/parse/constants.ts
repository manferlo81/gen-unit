import type { CreateParserOptions } from './types';

type CreateParserValidOptionName = keyof CreateParserOptions;
type CreateParserRemovedOptionName = 'table';

export const validParserOptions: CreateParserValidOptionName[] = ['unit', 'match', 'find'];

export const removedParserOptions: Record<CreateParserRemovedOptionName, CreateParserValidOptionName> = {
  table: 'find',
};
