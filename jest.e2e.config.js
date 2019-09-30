module.exports = {
  verbose: false,
  rootDir: '.',
  preset: 'ts-jest',
  globalSetup: './build/test/e2e/callSetup.js',
  testMatch: ['<rootDir>/test/e2e/test.*.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  clearMocks: true
}
