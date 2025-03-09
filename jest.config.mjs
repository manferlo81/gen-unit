const { COVERAGE } = process.env;
const collectCoverage = COVERAGE !== 'SKIP';
const coverageOnCI = COVERAGE === 'CI';

/** @type { import("ts-jest").JestConfigWithTsJest } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: coverageOnCI
    ? ['text', 'json', 'clover', 'cobertura']
    : ['text', 'html'],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  verbose: true,
};

export default config;
