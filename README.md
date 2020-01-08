# gen-unit

[![CircleCI](https://circleci.com/gh/manferlo81/gen-unit.svg?style=svg)](https://circleci.com/gh/manferlo81/gen-unit) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=manferlo81/gen-unit)](https://dependabot.com) [![npm](https://badgen.net/npm/v/gen-unit)](https://www.npmjs.com/package/gen-unit) [![codecov](https://codecov.io/gh/manferlo81/gen-unit/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/gen-unit) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/gen-unit/badge?style=rounded)](https://www.jsdelivr.com/package/npm/gen-unit) [![dependencies](https://badgen.net/david/dep/manferlo81/gen-unit)](https://david-dm.org/manferlo81/gen-unit) [![dev dependencies](https://badgen.net/david/dev/manferlo81/gen-unit)](https://david-dm.org/manferlo81/gen-unit?type=dev) [![packagephobia](https://badgen.net/packagephobia/install/gen-unit)](https://packagephobia.now.sh/result?p=gen-unit) [![bundlephobia](https://badgen.net/bundlephobia/min/gen-unit)](https://bundlephobia.com/result?p=gen-unit) [![types](https://img.shields.io/npm/types/gen-unit.svg)](https://github.com/microsoft/typescript) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/gen-unit/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/gen-unit?targetFile=package.json) [![license](https://badgen.net/github/license/manferlo81/gen-unit)](LICENSE)

A generic unit parser/formatter

> `gen-unit` is under development, sudden changes are expected before version `0.1.0`, the [API](#api) will be documented on that version. Any issue or recommendation is welcome and may be file [here](https://github.com/manferlo81/gen-unit/issues).

## API

### createParser

```typescript
function createParser(options): (input) => number
```

### createFormatter

```typescript
function createFormatter(options): (input) => string
```

## License

[MIT](LICENSE) &copy; [Manuel Fernández](https://github.com/manferlo81)
