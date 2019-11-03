module.exports = {

  testEnvironment: "node",
  browser: false,

  preset: "ts-jest",

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coverageDirectory: "coverage",
  coverageReporters: process.env.CI
    ? ["json", "clover"]
    : ["lcov", "text", "text-summary"],

  verbose: true,

};
