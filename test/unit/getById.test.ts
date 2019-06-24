import { createStubInstance } from 'sinon'
import { SelectQueryBuilder } from 'typeorm'
import { deepEqual } from 'assert'

import { postService } from '../../src/services'
import { Mock, post } from './utils'
import { Post } from '../../src/entities'

describe('typeorm => createQueryBuilder', () => {
  let mock: Mock

  it('getById method passed', async () => {
    const fakeQueryBuilder = createStubInstance(SelectQueryBuilder)

    fakeQueryBuilder.select.withArgs('post' as any).returnsThis()
    fakeQueryBuilder.from.withArgs(Post, 'post').returnsThis()
    fakeQueryBuilder.where.withArgs('post.id = :id', { id: 777 }).returnsThis()
    fakeQueryBuilder.getOne.resolves(post)

    mock = new Mock('createQueryBuilder', fakeQueryBuilder, Post)

    const result = await postService.getById(post.id)
    deepEqual(result, post)
  })

  afterEach(() => mock.close())
})
