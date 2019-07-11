## TypeORM mock unit testing examples with Jest and Mocha

[![Build Status][travis-image]][travis-url]

Its simple express server and e2e test.

## Steps to reproduce

```sh
docker-compose up -d

npm install
npm run test:e2e
```

**jest.e2e.config.js**
```
module.exports = {
  verbose: true,
  rootDir: '.',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/test/unit/*.test.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  testEnvironment: 'node',
  clearMocks: true
}
```

[travis-image]: https://travis-ci.org/yegorzaremba/typeorm-mock-unit-testing-example.svg?branch=reproduce-issue
[travis-url]: https://travis-ci.org/yegorzaremba/typeorm-mock-unit-testing-example
