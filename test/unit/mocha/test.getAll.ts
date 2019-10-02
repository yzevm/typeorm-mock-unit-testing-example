import { createStubInstance, createSandbox, SinonSandbox } from 'sinon'
import * as typeorm from 'typeorm'
import assert from 'assert'

import { postService } from '../../../src/services/postService'
import { Post } from '../../../src/entities'

describe('postService => getAll', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('getAll method passed', async () => {
    const fakeRepository = createStubInstance(typeorm.Repository)
    const fakeQueryBuilder = createStubInstance(typeorm.SelectQueryBuilder)
    const fakeConnection = createStubInstance(typeorm.Connection)

    fakeQueryBuilder.leftJoinAndSelect.withArgs('post.images', 'image').returnsThis()
    fakeQueryBuilder.orderBy.withArgs({ post: 'ASC', image: 'ASC' }).returnsThis()
    fakeQueryBuilder.getMany.resolves(['0x0'])

    fakeRepository.createQueryBuilder.withArgs('post').returns(fakeQueryBuilder as any)
    fakeConnection.getRepository.withArgs(Post).returns(fakeRepository as any)

    sandbox.stub(typeorm, 'getConnection').returns(fakeConnection as any)

    const result = await postService.getAll()
    assert.deepEqual(result, ['0x0'])
  })
})
