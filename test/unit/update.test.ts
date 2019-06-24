import { createStubInstance } from 'sinon'
import { Repository, UpdateResult } from 'typeorm'
import { deepEqual } from 'assert'

import { postService } from '../../src/services'
import { Mock, post } from './utils'

describe('typeorm => getRepository', () => {
  let mock: Mock

  it('update method passed', async () => {
    const fakeRepository = createStubInstance(Repository)

    fakeRepository.update.resolves({} as any as UpdateResult)
    fakeRepository.findOne.resolves(post)

    mock = new Mock('getRepository', fakeRepository)

    const result = await postService.update(post.id)
    deepEqual(result, post)
  })

  afterEach(() => mock.close())
})
