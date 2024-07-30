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
    : ['html', 'text'],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  verbose: true,

};
