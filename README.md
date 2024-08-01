# gen-unit

[![CircleCI](https://circleci.com/gh/manferlo81/gen-unit.svg?style=svg)](https://circleci.com/gh/manferlo81/gen-unit) [![npm](https://badgen.net/npm/v/gen-unit)](https://www.npmjs.com/package/gen-unit) [![codecov](https://codecov.io/gh/manferlo81/gen-unit/branch/main/graph/badge.svg)](https://codecov.io/gh/manferlo81/gen-unit) [![dependabot](https://badgen.net/github/dependabot/manferlo81/gen-unit)](https://github.com/manferlo81/gen-unit) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/gen-unit/badge?style=rounded)](https://www.jsdelivr.com/package/npm/gen-unit) [![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/gen-unit)](https://libraries.io/npm/gen-unit) [![install size](https://packagephobia.com/badge?p=gen-unit)](https://packagephobia.com/result?p=gen-unit) [![bundlephobia](https://badgen.net/bundlephobia/min/gen-unit)](https://bundlephobia.com/result?p=gen-unit) [![types](https://img.shields.io/npm/types/gen-unit.svg)](https://github.com/microsoft/typescript) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/gen-unit/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/gen-unit?targetFile=package.json) [![license](https://badgen.net/github/license/manferlo81/gen-unit)](LICENSE)

A generic unit parser/formatter

## Install

```bash
# Using npm
npm i gen-unit

# Using yarn
yarn add gen-unit
```

## API

- `createParser` [function](#the-createparser-function)
- `createParser` [options](#createparser-options)
  - `unit` [option](#the-unit-option)
  - `match` [option](#the-match-option)
    - `match` [option as a RegExp](#match-option-as-a-regexp)
    - `match` [option as a string](#match-option-as-a-string)
    - `match` [option as a function](#match-option-as-a-function)
  - `find` [option](#the-find-option)
    - `find` [option as a number](#find-option-as-a-number)
    - `find` [option as an array](#find-option-as-an-array)
    - `find` [option as an object](#find-option-as-an-object)
    - `find` [option as a function](#find-option-as-a-function)
- `createFormatter` [function](#the-createformatter-function)
- `createFormatter` [options](#createformatter-options)
  - `unit` [option](#the-unit-option-1)
  - `find` [option](#the-find-option-1)
    - `find` [option as a number](#find-option-as-a-number-1)
    - `find` [option as an array](#find-option-as-an-array-1)
    - `find` [option as an object](#find-option-as-an-object-1)
    - `find` [option as a function](#find-option-as-a-function-1)
  - `round` [option](#the-round-option)
    - `round` [option as an object](#round-option-as-an-object)
    - `round` [option as a number](#round-option-as-a-number)
    - `round` [option as a function](#round-option-as-a-function)
  - `output` [option](#the-output-option)
    - `output` [option as an object](#output-option-as-an-object)
    - `output` [option as a function](#output-option-as-a-function)
- `parse` [function](#the-parse-function)
- `format` [function](#the-format-function)
- `MICRO` [constant](#the-micro-constant)

### The `createParser` function

Creates a `parse` function using the given [options](#createparser-options).

```typescript
function createParser(options): Parser;

type Parser = (input: unknown) => number;
```

### `createParser` options

#### The `unit` option

Defines the `unit` to be used during parsing.

```typescript
unit: string;
```

***Example***

```typescript
const parse = createParser({
  unit: 'g',
});

parse('1'); // => 1
parse('1 g'); // => 1
parse('1 m'); // => 0.001
parse('1 mg'); // => 0.001
parse('1 k'); // => 1000
parse('1 kg'); // => 1000
parse('1 ms'); // => NaN because "s" is not recognized as unit
```

***Precedence***

This option takes precedence over any `prefix` or `prefixed unit`.

***Examples***

```typescript
const parseMeter = createParser({
  unit: 'm', // Meter
});

parseMeter('1 m'); // returns 1 (1 meter)
parseMeter('1 mm'); // returns 0.001 (1 millimeter)
```

```typescript
const parseSecond = createParser({
  unit: 's' // Seconds
});

parseSecond('1 m'); // returns 0.001 (1 millisecond)
parseSecond('1 ms'); // returns 0.001 (1 millisecond)
```

```typescript
const parse = createParser({
  unit: 'eg', // assuming "eg" is the unit... for some reason
});

parse('1 meg'); // => 0.001 (not 1000000), it's interpreted as 1 milli-eg
parse('1 megeg'); // => 1000000, it's interpreted as 1 mega-eg
parse('1 Meg'); // => 1000000, it's interpreted as 1 mega-eg because capital "M" parses as mega
```

#### The `match` option

```typescript
match: RegExp | string | MatchFunction;

type MatchFunction = (input: string) => [value: string, unit: string] | null | undefined;

default /^\s*(-?\d*\.?\d*(?:e[+-]?\d+)?)\s*([a-z\xb5]*)\s*$/i
```

Defines the first step in the `parse` process, it takes the `input` and should turn it into an `array` with `two elements` with the `value`, and the `unit` to be process further down the road, or `null` (or `undefined`) if the `input` can't be parsed.

##### `match` option as a RegExp

```typescript
match: RegExp;

default /^\s*(-?\d*\.?\d*(?:e[+-]?\d+)?)\s*([a-z\xb5]*)\s*$/i
```

A RegExp with `two capturing groups`, the first to be used as `value` and the second as `unit`. If the RegExp has less than `two capturing groups`, parse function will `throw`.

***Example***

```typescript
const parse = createParser({
  match: /^\s*([\d.]+)\s*([a-z]*)\s*$/i,
});

parse('1 m'); // => 0.001
parse('1 k'); // => 1000
```

##### `match` option as a string

```typescript
match: string;
```

A string to be used to create a RegExp. It is expected to have `two capturing groups`, the first to be used as `value` and the second as `unit`.

***Example***

```typescript
const parse = createParser({
  match: '^\\s*([\\d.]+)\\s*([a-z]*)\\s*$',
});

parse('1 m'); // => 0.001
parse('1 k'); // => 1000
```

##### `match` option as a function

```typescript
match: (input: string) => [value: string, unit: string] | null | undefined;
```

A function which will receive the `input` and should return an `array` of `two elements`, the first to be used as `value` and the second as `unit`, or `null` (or `undefined`) if the input can't be parsed.

***Example***

```typescript
const parse = createParser({
  match(input) {
    return [input, 'k']
  },
});

parse('1'); // => 1000
parse('2'); // => 2000
```

#### The `find` option

The `find` option describes how to find the multiplier which is the `number` by which the parsed value should be multiplied.

##### `find` option as a number

```typescript
find: number;
```

A number to be used as `base` during parsing.

***Example***

```typescript
const parse = createParser({
  find: 1024,
});

parse('2'); // => 2
parse('2 k'); // => 2048
parse('2 M'); // => 2097152
parse('2 G'); // => 2147483648
```

##### `find` option as an array

```typescript
find: Array<{ pre: string; exp: number }>;
```

An `array` of `objects` describing `prefixes` and `exponents` to use with the default `base` (1000) to find the `multiplier` to be used during parsing. Every item should have a unique `pre`, if there are duplicates `createParser` will `throw`.

***notes***

Note that `empty prefix` (`{ pre: '', exp: 0 }`) is not necessary, as an `empty prefix` will result in `multiplier = 1`

***Example***

```typescript
const parse = createParser({
  find: [
    { pre: 'k', exp: 1 },
    { pre: 'M', exp: 2 },
  ],
});

parse('1.3'); // => 1.3
parse('1.3 k'); // => 1300
parse('1.3 M'); // => 1300000
parse('1.3 G'); // => NaN because prefix "G" can't be found
```

##### `find` option as an object

```typescript
find: {
  base?: number;
  items?: Array<{ pre: string; exp: number }>;
};

default: {
  base: 1000,
  items: [
    { pre: 'a', exp: -6 },
    { pre: 'f', exp: -5 },
    { pre: 'p', exp: -4 },
    { pre: 'n', exp: -3 },
    { pre: 'u', exp: -2 },
    { pre: 'µ', exp: -2 },
    { pre: 'm', exp: -1 },
    { pre: 'k', exp: 1 },
    { pre: 'K', exp: 1 },
    { pre: 'meg', exp: 2 },
    { pre: 'M', exp: 2 },
    { pre: 'G', exp: 3 },
    { pre: 'T', exp: 4 },
    { pre: 'P', exp: 5 },
    { pre: 'E', exp: 6 },
  ],
}
```

An object describing the `base` and a series of `objects` describing `prefixes` and `exponents` to find the `multiplier` to be used during parsing. Every item in `items` array should have a unique `pre`, if there are duplicates `createParser` will `throw`.

***Notes***

Note that `empty prefix` (`{ pre: '', exp: 0 }`) is not necessary, as an `empty prefix` will result in `multiplier = 1`

***Example***

```typescript
const parse = createParser({
  find: {
    base: 1024,
    items: [
      { pre: 'K', exp: 1 },
      { pre: 'M', exp: 2 },
    ],
  },
});

parse('1'); // => 1
parse('1 K'); // => 1024
parse('1 M'); // => 1048576
parse('1 G'); // => NaN
```

##### `find` option as a function

```typescript
find: (pre: string) => number | null | undefined;
```

A function that should return a non-zero `number` by which the parsed value should be multiplied based on the captured prefix. Return `null` (or `undefined`) if multiplier can't be determined. It will cause the parse function to return `NaN`. If your function returns `zero`, `negative number` or any other invalid multiplier, parse function will throw a `TypeError`.

***Example***

```typescript
const parse = createParser({
  find: (unit) => {
    if (unit === 'K' || unit === 'k') {
      return 1024;
    } else if (unit === 'M') {
      return 1024 ** 2;
    }
    // next line can be omitted
    // as it will return undefined anyway
    return null;
  },
});

parse('2'); // => 2
parse('2 k'); // => 2048
parse('2 K'); // => 2048
parse('2 M'); // => 2097152
parse('2 G'); // => NaN
```

***Notes***

Previous version of this library allow this function to return an object `{ mul: number }` containing the multiplier. This behavior has been removed, it will `throw` instead.

### The `createFormatter` function

Creates a `format` function using the given [options](#createformatter-options).

```typescript
function createFormatter(options): Formatter;

type Formatter = (input: number) => string;
```

### `createFormatter` options

#### The `unit` option

A `string` to be used as main `unit` during formatting.

```typescript
unit: string;
```

***Example***

```typescript
const format = createFormatter({
  unit: 'm',
});

format(100); // => '100 m'
format(0.0012); // => '1.2 mm'
format(1200); // => '1.2 Km'
```

#### The `find` option

Describes how to find the unit `prefix` and `divider` based on input value.

##### `find` option as a number

```typescript
find: number;
```

A `number` to be used as `base` during formatting.

***Example***

```typescript
const format = createFormatter({
  find: 1024,
});

format(100); // => '100'
format(2048); // => '2 k'
format(2097152); // => '2 M'
```

##### `find` option as an array

```typescript
find: Array<{ pre: string; exp: number }>;
```

An `array` of `objects` describing `prefixes` and `exponents` to use with the default `base` (1000) to find the `prefix` and `multiplier` to be used during formatting. Every item should have a unique `exp`, if there are duplicates `createFormatter` will `throw`.

***Example***

```typescript
const format = createFormatter({
  find: [
    { exp: 0, pre: '' },
    { exp: 1, pre: 'K' },
  ],
});

format(2); // => '2'
format(2000); // => '2 K'
format(2000000); // => '2000 K'
```

##### `find` option as an object

```typescript
find: {
  base?: number;
  items?: Array<{ exp: number; pre: string }>;
}

default: {
  base: 1000,
  items: [
    { exp: -6, pre: 'a' },
    { exp: -5, pre: 'f' },
    { exp: -4, pre: 'p' },
    { exp: -3, pre: 'n' },
    { exp: -2, pre: 'µ' },
    { exp: -1, pre: 'm' },
    { exp: 0, pre: '' },
    { exp: 1, pre: 'k' },
    { exp: 2, pre: 'M' },
    { exp: 3, pre: 'G' },
    { exp: 4, pre: 'T' },
    { exp: 5, pre: 'P' },
    { exp: 6, pre: 'E' },
  ],
}
```

An object describing the `base` and a series of `objects` describing `prefixes` and `exponents` to find the `prefix` and `multiplier` to be used during formatting. Every item in `items` array should have a unique `exp`, if there are duplicates `createFormatter` will `throw`.

***Example***

```typescript
const format = createFormatter({
  find: {
    base: 1024,
    items: [
      { exp: 0, pre: '' },
      { exp: 1, pre: 'K' },
    ],
  },
});

format(100); // => '100'
format(2048); // => '2 K'
format(2097152); // => '2048 K'
```

##### `find` option as a function

```typescript
find: (value: number) => { pre: string; mul: number };
```

A `function` that `returns` an `object` describing the unit `prefix` (`pre`) and `multiplier` (`mul`).

***Example***

```typescript
const format = createFormatter({
  find: (value) => {
    if (value >= 1000) {
      return { pre: 'K', mul: 1000 };
    } else {
      return { pre: '', mul: 1 };
    }
  },
});

format(0.2); // => '0.2'
format(2); // => '2'
format(2000); // => '2 K'
format(2000000); // => '2000 K'
```

#### The `round` option

Describes how to `round` the output value before final `format`.

##### `round` option as an object

```typescript
round: {
  dec?: number;
  fixed?: boolean;
};

default: {
  dec: 2,
  fixed: false,
};
```

An `object` describing how to `round` the value before final format. Describes the number of decimal (`dec`) and whether or not the output should have a fixed number of decimal (`fixed`).

***Example***

```typescript
const format = createFormatter({
  round: {
    dec: 3,
    fixed: true,
  },
});

format(1.23); // => '1.230'
format(1230); // => '1.230 k'
format(0.00123); // => '1.230 m'
```

##### `round` option as a number

```typescript
round: number;
```

A `number` defining the number of decimal places to round to.

***Example***

```typescript
const format = createFormatter({
  round: 1,
});

format(1.23); // => '1.2'
format(1.28); // => '1.3'
format(1230); // => '1.2 k'
format(0.00123); // => '1.2 m'
```

##### `round` option as a function

```typescript
round: (num: number) => (string | number);
```

A `function` which `returns` the rounded value.

***Example***

```typescript
const format = createFormatter({
  round: Math.round,
});

format(1.23); // => '1'
format(1.75); // => '2'
format(1230); // => '1 k'
format(0.00123); // => '1 m'
```

#### The `output` option

Describes the final output format.

```typescript
output: FormatOutputFunction | FormatOutputAdvancedOption;

type FormatOutputFunction = (value: string | number, prefix: string, unit: string) => string;

interface FormatOutputAdvancedOption {
  space: string;
}
```

##### `output` option as an object

```typescript
output: {
  space?: string;
}

default {
  space: ' ';
}
```

***Example***

```typescript
const format = createFormatter({
  output: {
    space: '-', // unrealistic, for demonstration only
  },
})

format(1.23); // => '1.23'
format(1230); // => '1.23-k'
format(0.00123); // => '1.23-m'
```

##### `output` option as a function

A `function` to format the final output.

```typescript
output: (value: string | number, prefix: string, unit: string) => string;
```

***Example***

```typescript
const format = createFormatter({
  unit: 'x',
  output: (value, pre) => {
    // ignore original unit and hardcode one
    return `${value}${pre}s`;
  },
});

format(1.23); // => '1.23s'
format(1230); // => '1.23ks'
format(0.00123); // => '1.23ms'
```

### The `parse` function

A convenient function to parse an `input` in one step. I will internally call `createParser` then will call the newly created parser. See `createParser` [options](#createparser-options).

```typescript
function parse(input, options): number;
```

### The `format` function

A convenient function to format a `number` in one step. It wil internally call `createFormatter` then will call the newly created formatter. See `createFormatter` [options](#createformatter-options).

```typescript
function format(input, options): string;
```

### The `MICRO` constant

A constant containing the micro symbol ("µ"). Used internally, exported for convenience.

## License

[MIT](LICENSE) &copy; 2019-2024 [Manuel Fernández](https://github.com/manferlo81)
