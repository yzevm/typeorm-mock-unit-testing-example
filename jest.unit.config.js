module.exports = {
  verbose: true,
  rootDir: '.',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/test/unit/jest/*.test.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  testEnvironment: 'node',
  clearMocks: true
}