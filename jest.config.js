module.exports = {

  testEnvironment: 'node',
  browser: false,

  preset: 'ts-jest',
  cacheDirectory: 'node_modules/.cache/jest',

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: process.env.CI
    ? ['json', 'clover']
    : ['lcov', 'text', 'text-summary'],

  verbose: true,

}
