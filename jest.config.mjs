const { COVERAGE } = process.env;
const collectCoverage = COVERAGE !== 'SKIP';
const coverageOnCI = COVERAGE === 'CI';

/** @type { import("jest").Config } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: coverageOnCI
    ? ['json', 'clover', 'cobertura']
    : ['html', 'text'],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  verbose: true,
};

export default config;
