## TypeORM mock unit testing examples with Jest and Mocha

Example how to mock TypeORM for your blaze unit tests with Mocha and Jest.
It's a simple `express` server

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Contributions welcome][pr-image]][pr-url]
[![License: MIT][license-image]][license-url]

## Usage

### Testing

Run Mocha unit-tests

```sh
npm install
npm run test:mocha
```

Run Jest unit-tests

```sh
npm run test:jest
```

Run e2e tests

```sh
docker-compose up -d
npm run test:e2e
```

### Development

Run express server after changes

```sh
npm start
```

Build express server

```sh
npm run build
```

## Example

```js
import * as typeorm from 'typeorm'
import { createSandbox, SinonSandbox, createStubInstance } from 'sinon'
import { deepEqual } from 'assert'

class Mock {
  sandbox: SinonSandbox

  constructor(method: string | any, fakeData: any, args?: any) {
    this.sandbox = createSandbox()

    if (args) {
      this.sandbox
        .stub(typeorm, method)
        .withArgs(args)
        .returns(fakeData)
    } else {
      this.sandbox.stub(typeorm, method).returns(fakeData)
    }
  }

  close() {
    this.sandbox.restore()
  }
}

describe('mocha => typeorm => getManager', () => {
  let mock: Mock

  it('getAll method passed', async () => {
    const fakeManager = createStubInstance(typeorm.EntityManager)
    fakeManager.find.resolves([post])

    mock = new Mock('getManager', fakeManager)

    const result = await postService.getAll()
    deepEqual(result, [post])
  })

  afterEach(() => mock.close())
})
```

[travis-image]: https://travis-ci.org/yegorzaremba/typeorm-mock-unit-testing-example.svg?branch=master
[travis-url]: https://travis-ci.org/yegorzaremba/typeorm-mock-unit-testing-example
[coveralls-image]: https://coveralls.io/repos/github/YegorZaremba/typeorm-mock-unit-testing-example/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/YegorZaremba/typeorm-mock-unit-testing-example?branch=master
[pr-image]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat
[pr-url]: https://github.com/yegorzaremba/typeorm-mock-unit-testing-example/issues
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT
