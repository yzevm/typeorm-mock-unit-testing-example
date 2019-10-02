import { createStubInstance, createSandbox, SinonSandbox } from 'sinon'
import * as typeorm from 'typeorm'
import assert from 'assert'

import { postService } from '../../../src/services'
import { post } from '../../utils'
import { Post } from '../../../src/entities'

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
