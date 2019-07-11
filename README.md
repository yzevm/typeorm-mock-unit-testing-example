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

error input
```
 FAIL  node_modules/sdk/req.test.ts
  ● Test suite failed to run

    The name `source-map` was looked up in the Haste module map. It cannot be resolved, because there exists several different files, or packages, that provide a module for that particular name and platform. The platform is generic (no extension). You must delete or blacklist files until there remains only one of these:

      * `/home/egor/Desktop/github/forks/typeorm-mock-unit-testing-example/node_modules/@babel/core/node_modules/source-map/package.json` (package)
      * `/home/egor/Desktop/github/forks/typeorm-mock-unit-testing-example/node_modules/@babel/generator/node_modules/source-map/package.json` (package)
      * `/home/egor/Desktop/github/forks/typeorm-mock-unit-testing-example/node_modules/snapdragon/node_modules/source-map/package.json` (package)
      * `/home/egor/Desktop/github/forks/typeorm-mock-unit-testing-example/node_modules/source-map/package.json` (package)

      at ModuleMap._assertNoDuplicates (node_modules/jest-haste-map/build/ModuleMap.js:280:11)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.039s
Ran all test suites.
```

[travis-image]: https://travis-ci.org/yegorzaremba/typeorm-mock-unit-testing-example.svg?branch=reproduce-issue
[travis-url]: https://travis-ci.org/yegorzaremba/typeorm-mock-unit-testing-example
