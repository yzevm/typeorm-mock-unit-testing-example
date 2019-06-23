import { createStubInstance } from 'sinon'
import { Repository, UpdateResult, Connection } from 'typeorm'
import { deepEqual } from 'assert'

import { postService } from '../../src/services'
import { Mock, post } from './utils'
import { Post } from '../../src/entities'

describe('mocha => typeorm => getConnection', () => {
  let mock: Mock

  it('create method passed', async () => {
    const fakeConnection = createStubInstance(Connection)
    const fakeRepository = createStubInstance(Repository)

    fakeRepository.create.resolves([post])
    fakeRepository.save.resolves(post)

    fakeConnection.getRepository.withArgs(Post).returns(fakeRepository as any)
    mock = new Mock('getConnection', fakeConnection)

    const result = await postService.create({ title: post.title })
    deepEqual(result, post)
  })

  afterEach(() => mock.close())
})
