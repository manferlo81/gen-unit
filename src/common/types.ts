export interface ExponentFindItem {
  pre: string;
  exp: number;
}

export type ExponentFindItems = ExponentFindItem[];

export interface FindUnitAdvancedOptions {
  base?: number;
  find?: ExponentFindItems;
}
