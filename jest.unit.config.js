module.exports = {
  verbose: true,
  rootDir: '.',
  preset: 'ts-jest',
  testMatch: ['<rootDir>././build/test/unit/jest/test.*.js'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  clearMocks: true
}
