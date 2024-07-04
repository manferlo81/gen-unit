import { MICRO } from './constants';
import type { FindExponentItem } from './types';

export const exa: FindExponentItem = { pre: 'E', exp: 6 };
export const peta: FindExponentItem = { pre: 'P', exp: 5 };
export const tera: FindExponentItem = { pre: 'T', exp: 4 };
export const giga: FindExponentItem = { pre: 'G', exp: 3 };
export const mega: FindExponentItem = { pre: 'M', exp: 2 };
export const kilo: FindExponentItem = { pre: 'k', exp: 1 };
export const milli: FindExponentItem = { pre: 'm', exp: -1 };
export const micro: FindExponentItem = { pre: MICRO, exp: -2 };
export const nano: FindExponentItem = { pre: 'n', exp: -3 };
export const pico: FindExponentItem = { pre: 'p', exp: -4 };
export const femto: FindExponentItem = { pre: 'f', exp: -5 };
export const atto: FindExponentItem = { pre: 'a', exp: -6 };
