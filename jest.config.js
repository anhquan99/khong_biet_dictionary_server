module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/Utils/SetupJest.ts"],
  globalTeardown: "<rootDir>/src/Utils/GlobalTeardownJest.ts",
  // setupFiles: ["<rootDir>/src/Utils/SetupJest.ts"],
};
