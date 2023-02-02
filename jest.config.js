module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
      },
    ],
  },
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageReporters: [
    //   "json",
    //   "text",
    "lcov",
    //   "clover"
  ],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
  },
  resetMocks: false,
  setupFilesAfterEnv: [
    "jest-mock-console/dist/setupTestFramework.js",
  ],

  testEnvironment: "node",

  verbose: true,
}
