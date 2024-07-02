export interface FindExponentItem {
  pre: string;
  exp: number;
}

export type FindExponentItems = FindExponentItem[];

export interface FindUnitAdvancedOptions {
  base?: number;
  find?: FindExponentItems;
}
