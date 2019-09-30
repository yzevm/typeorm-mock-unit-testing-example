import { createSandbox, SinonSandbox, spy } from 'sinon'
import * as typeorm from 'typeorm'
import assert from 'assert'

import { postService, PostServiceDataToCreate } from '../../../src/services'
import { post, images } from '../../utils'

describe('postService => create', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('create post with images passed', async () => {
    const spyOnSave = spy(() => Promise.resolve(post))
    sandbox.stub(typeorm, 'getRepository').returns({ save: spyOnSave } as any)

    // @ts-ignore @docs Yeah, it's disaster, but I have already done tests for _findPostById() method (getById())
    sandbox.stub(postService, '_findPostById').resolves('0x0')
    const dataToCreate: PostServiceDataToCreate = { ...post, images }
    const result = await postService.create(dataToCreate)

    assert.equal(result, '0x0')
    assert.deepEqual(spyOnSave.callCount, 3)
    assert.deepEqual(spyOnSave.getCall(0).args, [post])
    assert.deepEqual(spyOnSave.getCall(1).args, [{ ...images[0], post }])
    assert.deepEqual(spyOnSave.getCall(2).args, [{ ...images[1], post }])
  })
})
