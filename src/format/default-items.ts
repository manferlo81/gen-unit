import { atto, exa, femto, giga, kilo, mega, micro, milli, nano, peta, pico, tera } from '../common/exp-items';
import type { MultiplierFindItem } from '../common/types';
import { sortFormatExponentItems } from './sort-items';

export const unity: MultiplierFindItem = { pre: '', mul: 1 };

export const defaultBase1000FormatExpItems = sortFormatExponentItems([
  exa,
  peta,
  tera,
  giga,
  mega,
  kilo,
  { exp: 0, pre: '' },
  milli,
  micro,
  nano,
  pico,
  femto,
  atto,
]);
