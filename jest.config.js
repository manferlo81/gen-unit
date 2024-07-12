module.exports = {

  testEnvironment: 'node',

  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: process.env.CI
    ? ['json', 'clover']
    : ['lcov', 'text', 'text-summary'],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  verbose: true,

};
