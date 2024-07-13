import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/exp-items';
import type { ExponentFindItems } from '../common/types';

export const defaultBase1000ParseExpItems: ExponentFindItems = [
  exa,
  peta,
  tera,
  giga,
  { pre: 'meg', exp: 2 },
  mega,
  { pre: 'K', exp: 1 },
  kilo,
  milli,
  { pre: 'u', exp: -2 },
  micro,
  nano,
  pico,
  femto,
  atto,
];
