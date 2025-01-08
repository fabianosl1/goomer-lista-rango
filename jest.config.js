/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Mapeamento para suportar aliases
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"]
};