## TypeORM mock unit testing examples with Jest and Mocha

Example how to mock TypeORM for your blazing unit tests with Mocha and Jest.
It's a simple `express` server

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![StackOverflow Question][so-image]][so-url]
[![Contributions welcome][pr-image]][pr-url]
[![License: MIT][license-image]][license-url]

## Usage

### Testing

Run Mocha unit-tests

```sh
npm ci
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

#### Sourse code
```js
class PostService {
  public getById(id: number): Promise<Post> {
    return this._findPostById(id)
  }

  private _findPostById(id: number): Promise<Post> {
    return createQueryBuilder()
      .select(['post'])
      .from(Post, 'post')
      .leftJoinAndSelect('post.images', 'image')
      .where('post.id = :id', { id })
      .orderBy({ image: 'ASC' })
      .getOne()
  }
}
```

#### Jest
```js
describe('postService => getById', () => {
  it('getById method passed', async () => {
    typeorm.createQueryBuilder = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue('0x0')
    })
    const result = await postService.getById(post.id)

    expect(result).toEqual('0x0')

    const qBuilder = typeorm.createQueryBuilder()
    expect(qBuilder.select).toHaveBeenNthCalledWith(1, ['post'])
    expect(qBuilder.from).toHaveBeenNthCalledWith(1, Post, 'post')
    expect(qBuilder.leftJoinAndSelect).toHaveBeenNthCalledWith(1, 'post.images', 'image')
    expect(qBuilder.where).toHaveBeenNthCalledWith(1, 'post.id = :id', { id: post.id })
    expect(qBuilder.orderBy).toHaveBeenNthCalledWith(1, { image: 'ASC' })
    expect(qBuilder.getOne).toHaveBeenNthCalledWith(1)
  })
})
```

#### Sinon
```js
describe('postService => getById', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('getById method passed', async () => {
    const fakeQueryBuilder = createStubInstance(typeorm.SelectQueryBuilder)

    fakeQueryBuilder.select.withArgs(['post']).returnsThis()
    fakeQueryBuilder.from.withArgs(Post, 'post').returnsThis()
    fakeQueryBuilder.leftJoinAndSelect.withArgs('post.images', 'image').returnsThis()
    fakeQueryBuilder.where.withArgs('post.id = :id', { id: post.id }).returnsThis()
    fakeQueryBuilder.orderBy.withArgs({ image: 'ASC' }).returnsThis()
    fakeQueryBuilder.getOne.resolves('0x0')

    sandbox.stub(typeorm, 'createQueryBuilder').returns(fakeQueryBuilder as any)

    const result = await postService.getById(post.id)
    assert.equal(result, '0x0')
  })
})
```

[travis-image]: https://travis-ci.org/yegorzaremba/typeorm-mock-unit-testing-example.svg?branch=master
[travis-url]: https://travis-ci.org/yegorzaremba/typeorm-mock-unit-testing-example
[coveralls-image]: https://coveralls.io/repos/github/YegorZaremba/typeorm-mock-unit-testing-example/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/YegorZaremba/typeorm-mock-unit-testing-example?branch=master
[so-image]: https://img.shields.io/badge/StackOverflow-Question-green.svg
[so-url]: https://stackoverflow.com/q/51482701/10432429
[pr-image]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat
[pr-url]: https://github.com/yegorzaremba/typeorm-mock-unit-testing-example/issues
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT
