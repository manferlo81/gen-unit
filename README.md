# gen-unit

[![CircleCI](https://circleci.com/gh/manferlo81/gen-unit.svg?style=svg)](https://circleci.com/gh/manferlo81/gen-unit) [![npm](https://badgen.net/npm/v/gen-unit)](https://www.npmjs.com/package/gen-unit) [![codecov](https://codecov.io/gh/manferlo81/gen-unit/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/gen-unit) [![dependabot](https://badgen.net/github/dependabot/manferlo81/gen-unit)](https://github.com/manferlo81/gen-unit) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/gen-unit/badge?style=rounded)](https://www.jsdelivr.com/package/npm/gen-unit) [![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/gen-unit)](https://libraries.io/npm/gen-unit) [![install size](https://packagephobia.com/badge?p=gen-unit)](https://packagephobia.com/result?p=gen-unit) [![bundlephobia](https://badgen.net/bundlephobia/min/gen-unit)](https://bundlephobia.com/result?p=gen-unit) [![types](https://img.shields.io/npm/types/gen-unit.svg)](https://github.com/microsoft/typescript) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/gen-unit/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/gen-unit?targetFile=package.json) [![license](https://badgen.net/github/license/manferlo81/gen-unit)](LICENSE)

A generic unit parser/formatter

## Install

```bash
# Using npm
npm i gen-unit

# Using yarn
yarn add gen-unit
```

## API

- [createParser](#createparser)
  - ["unit" option](#unit)
  - ["find" option](#find)
- [createFormatter](#createformatter)
  - ["unit" option](#unit-1)
  - ["find" option](#find-1)

### createParser

Creates a `parse` function using the given options.

```typescript
function createParser(options): ParseFunction;

type ParseFunction = (input: string | number | object) => number;
```

#### Options

##### unit

The `"unit"` option defines the unit to be used during parsing.

```typescript
unit: string;
```

***example***

```typescript
const parse = createParser({
  unit: 'g',
});

parse('1'); // => 1
parse('1 g'); // => 1
parse('1 mg'); // => 0.001
parse('1 K'); // => 1000
parse('1 Kg'); // => 1000
parse('1 ms'); // => NaN
```

- Precedence

This option takes precedence over any prefix or prefixed unit.

***examples***

```typescript
const parseMeter = createParser({
  unit: 'm', // Meter
});

parseMeter('1 m'); // returns 1 (1 meter)
parseMeter('1 mm'); // returns 0.001 (1 millimeter)

const parseSecond = createParser({
  unit: 's'
});

parseSecond('1 m'); // returns 0.001 (1 millisecond)
parseSecond('1 ms'); // returns 0.001 (1 millisecond)
```

```typescript
const parse = createParser({
  unit: 'eg', // assume "eg" is the unit... for some reason
});

parse('1 meg'); // => 0.001 (not 1000000)
parse('1 megeg'); // => 1000000
parse('1 Meg'); // => 1000000
```

##### find

The `"find"` option describes how to find the `number` by which the parsed value should be multiplied.

- ***"find" option as an object***

```typescript
find: {
  base?: number;
  find?: Array<{ pre: string; exp: number }>;
};

default: {
  base: 1000,
  find: [
    { pre: 'f', exp: -5 },
    { pre: 'p', exp: -4 },
    { pre: 'n', exp: -3 },
    { pre: 'u', exp: -2 },
    { pre: 'm', exp: -1 },
    { pre: 'k', exp: 1 },
    { pre: 'K', exp: 1 },
    { pre: 'meg', exp: 2 },
    { pre: 'M', exp: 2 },
    { pre: 'G', exp: 3 },
    { pre: 'T', exp: 4 },
  ],
}
```

An object describing the `base` and unit `prefixes` to find the `multiplier`.

***example***

```typescript
const parse = createParser({
  find: {
    base: 1024,
    find: [
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

- ***"find" option as a number***

```typescript
find: number;
```

A number to be used as `base` during parsing.

***example***

```typescript
const parse = createParser({
  find: 1024,
});

parse('2'); // => 2
parse('2 K'); // => 2048
parse('2 M'); // => 2097152
parse('2 G'); // => 2147483648
```

- ***"find" option as an array***

```typescript
find: Array<{ pre: string; exp: number }>;
```

An `array` of `objects` describing the different units `prefixes`.

***example***

```typescript
const parse = createParser({
  find: [
    { pre: 'K', exp: 1 },
    { pre: 'M', exp: 2 },
  ],
});

parse('1.3'); // => 1.3
parse('1.3 K'); // => 1300
parse('1.3 M'); // => 1300000
parse('1.3 G'); // => NaN
```

- ***"find" option as a function***

```typescript
find: (unit: string) => number | null;
```

A function that returns a non-zero `number` by which the parsed value should be multiplied based on the captured `unit`. Return `null` (or `undefined`) if multiplier can't be determined. I will cause the parse function to return `NaN`. If your function returns zero (`0`), parse function will throw a `TypeError`.

***example***

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
parse('2 K'); // => 2048
parse('2 M'); // => 2097152
parse('2 G'); // => NaN
```

- ***Notes***

Previous version of this library allow this function to return an object `{ mul: number }` containing the multiplier. While this still works it's not recommended as this behavior will be removed in the future.

### createFormatter

Creates a `format` function using the given options.

```typescript
function createFormatter(options): FormatFunction;

type FormatFunction = (input) => string;
```

#### Options

##### unit

The `"unit"` option defines the `unit` to be used during formatting.

- ***"unit" option as a string***

```typescript
unit: string;
```

A `string` to be used as main `unit`.

***example***

```typescript
const format = createFormatter({
  unit: 'm',
});

format(100); // => '100 m'
format(0.0012); // => '1.2 mm'
format(1200); // => '1.2 Km'
```

- ***"unit" option as a function***

```typescript
unit: (value: number, rounded: string | number, pre: string) => string;
```

A `function` that `returns` the `unit` based on parameters.

***example***

```typescript
const format = createFormatter({
  unit: (value, rounded, pre) => {
    return 'm';
  },
});

format(100); // => '100 m'
format(0.0012); // => '1.2 mm'
format(1200); // => '1.2 Km'
```

##### find

The `"find"` option describes how to find the unit `prefix` based on input value.

- ***"find" option as an object***

```typescript
find: {
  base?: number;
  find?: Array<{ exp: number; pre: string }>;
}

default: {
  base: 1000,
  find: [
    { exp: -5, pre: 'f' },
    { exp: -4, pre: 'p' },
    { exp: -3, pre: 'n' },
    { exp: -2, pre: 'µ' },
    { exp: -1, pre: 'm' },
    { exp: 0, pre: '' },
    { exp: 1, pre: 'K' },
    { exp: 2, pre: 'M' },
    { exp: 3, pre: 'G' },
    { exp: 4, pre: 'T' },
  ],
}
```

<!-- Description here -->

***example***

```typescript
const format = createFormatter({
  find: {
    base: 1024,
    find: [
      { exp: 0, pre: '' },
      { exp: 1, pre: 'K' },
    ],
  },
});

format(100); // => '100'
format(2048); // => '2 K'
format(2097152); // => '2048 K'
```

- ***"find" option as a number***

```typescript
find: number;
```

A `number` to be used as `base` during formatting.

***example***

```typescript
const format = createFormatter({
  find: 1024,
});

format(100); // => '100'
format(2048); // => '2 K'
format(2097152); // => '2 M'
```

- ***"find" option as an array***

```typescript
find: Array<{ exp: number; pre: string }>;
```

An `array` of `objects` describing the different unit `prefixes`.

***example***

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

- ***"find" option as a function***

```typescript
find: (value: number) => { div: number; pre: string };
```

A `function` that `returns` an `object` describing the unit `prefix`.

***example***

```typescript
const format = createFormatter({
  find: (value) => {
    if (value >= 1000) {
      return { pre: 'K', div: 1000 };
    } else {
      return { pre: '', div: 1 };
    }
  },
});

format(2); // => '2'
format(2000); // => '2 K'
format(2000000); // => '2000 K'
```

##### round

The `"round"` option describes how to round the value.

- ***"round" option as an object***

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

An `object` describing how to format the value.

***example***

```typescript
const format = createFormatter({
  round: {
    dec: 3,
    fixed: true,
  },
});

format(1.23); // => '1.230'
format(1230); // => '1.230 K'
format(0.00123); // => '1.230 m'
```

- ***"round" option as a number***

```typescript
round: number;
```

A `number` defining the number of decimal places to round to.

***example***

```typescript
const format = createFormatter({
  round: 1,
});

format(1.23); // => '1.2'
format(1230); // => '1.2 K'
format(0.00123); // => '1.2 m'
```

- ***"round" option a function***

```typescript
round: (num: number) => (string | number);
```

A `function` that `returns` a rounded value.

***example***

```typescript
const format = createFormatter({
  round: Math.round,
});

format(1.23); // => '1'
format(1230); // => '1 K'
format(0.00123); // => '1 m'
```

##### output

A `function` to format the final output.

```typescript
output: (value: string | number, pre: string, unit: string) => (string | number);
```

***example***

```typescript
const format = createFormatter({
  output: (value, pre) => `${value}${pre}s`,
})

format(1.23); // => '1.23s'
format(1230); // => '1.23Ks'
format(0.00123); // => '1.23ms'
```

### parse

A convenient function to parse an input in one step.

```typescript
function parse(input, options): number;
```

### format

A convenient function to format a `number` in one step.

```typescript
function format(input, options): string;
```

## License

[MIT](LICENSE) &copy; [Manuel Fernández](https://github.com/manferlo81)
