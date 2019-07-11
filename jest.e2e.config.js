module.exports = {
  verbose: true,
  rootDir: '.',
  preset: 'ts-jest',
  globalSetup: './build/test/e2e/callSetup.js',
  testMatch: ['<rootDir>/node_modules/sdk/req.test.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  testEnvironment: 'node',
  haste: {
    providesModuleNodeModules: ['.*']
  },
  testPathIgnorePatterns: [],
}

