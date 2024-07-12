import { MICRO } from './constants';
import type { ExponentFindItem } from './types';

export const exa: ExponentFindItem = { pre: 'E', exp: 6 };
export const peta: ExponentFindItem = { pre: 'P', exp: 5 };
export const tera: ExponentFindItem = { pre: 'T', exp: 4 };
export const giga: ExponentFindItem = { pre: 'G', exp: 3 };
export const mega: ExponentFindItem = { pre: 'M', exp: 2 };
export const kilo: ExponentFindItem = { pre: 'k', exp: 1 };
export const milli: ExponentFindItem = { pre: 'm', exp: -1 };
export const micro: ExponentFindItem = { pre: MICRO, exp: -2 };
export const nano: ExponentFindItem = { pre: 'n', exp: -3 };
export const pico: ExponentFindItem = { pre: 'p', exp: -4 };
export const femto: ExponentFindItem = { pre: 'f', exp: -5 };
export const atto: ExponentFindItem = { pre: 'a', exp: -6 };
