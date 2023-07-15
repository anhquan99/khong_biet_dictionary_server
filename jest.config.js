module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/TestSetup/GlobalSetupJest.ts"],
  globalTeardown: "<rootDir>/src/TestSetup/GlobalTeardownJest.ts",
};
