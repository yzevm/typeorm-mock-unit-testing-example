import { createStubInstance } from 'sinon'
import { EntityManager } from 'typeorm'
import { deepEqual } from 'assert'

import { postService } from '../../src/services/postService'
import { Mock, post } from './utils'

describe('typeorm => getManager', () => {
  let mock: Mock

  it('getAll method passed', async () => {
    const fakeManager = createStubInstance(EntityManager)
    fakeManager.find.resolves([post])

    mock = new Mock('getManager', fakeManager)

    const result = await postService.getAll()
    deepEqual(result, [post])
  })

  afterEach(() => mock.close())
})
