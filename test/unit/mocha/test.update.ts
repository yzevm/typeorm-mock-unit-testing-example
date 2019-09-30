import { createSandbox, SinonSandbox } from 'sinon'
import * as typeorm from 'typeorm'
import assert from 'assert'

import { postService, IPostServiceDataToUpdate } from '../../../src/services'
import { images, post, helpers } from '../../utils'

describe('postService => update', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('update post with new images and existed images passed', async () => {
    const spyOnSave = sandbox.spy(() => Promise.resolve('0x0'))
    sandbox.stub(typeorm, 'getRepository').returns({ save: spyOnSave } as any)

    // @ts-ignore @docs Yeah, it's disaster, but I have already done tests for _findPostById() method (getById())
    sandbox.stub(postService, '_findPostById').resolves({...post, images})

    const data: IPostServiceDataToUpdate = {
      id: 1,
      title: 'updated title',
      archived: true,
      images: [
        {
          id: 0,
          url: 'https://new-url',
          archived: true
        },
        {
          id: images[0].id,
          url: 'updated url',
          archived: true
        }
      ]
    }

    assert(await postService.update(data))

    assert.equal(spyOnSave.callCount, 3)

    const firstCall = spyOnSave.getCall(0).args as any[]
    const justUpdatedImage = helpers.omit(firstCall[0], ['post']) // @todo re-write data?
    assert.deepEqual(justUpdatedImage, data.images[0]) // save new image

    assert.deepEqual(spyOnSave.getCall(1).args, [data.images[1]]) // update existed image

    const justUpdatedPost = helpers.omit(data, ['images'])
    assert.deepEqual(spyOnSave.getCall(2).args, [{ ...justUpdatedPost, images: [...images, '0x0'] }])
  })
})
