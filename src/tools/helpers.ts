type ObjectHasOwnProperty = (this: Record<string | number, unknown>, key: string | number) => boolean;
export const { hasOwnProperty: hasOwn } = Object.prototype as { hasOwnProperty: ObjectHasOwnProperty };
