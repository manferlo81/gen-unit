export interface MultiplierFound {
  mul: number;
}

export type InternalFindMultiplierFunction = (capturedWholeUnit: string) => MultiplierFound | null;
