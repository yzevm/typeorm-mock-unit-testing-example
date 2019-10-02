import * as request from 'request-promise'
import assert from 'assert'
import { post, images } from '../utils'
import { Post } from '../../src/entities'

interface IResponsePostType { response: Post }

describe('post router', () => {
  it('getAll post passed', async () => {
    const options = {
      uri: `${process.env.TEST_HOST}/posts`,
      json: true
    }

    const { response } = await request.get(options)
    assert.deepEqual(response, [{...post, images}])
  })

  it('getById post passed', async () => {
    const options = {
      uri: `${process.env.TEST_HOST}/posts/1`,
      json: true
    }

    const { response } = await request.get(options)
    assert.deepEqual(response, {...post, images})
  })

  it('create post passed', async () => {
    const title = 'new post2'

    const options = {
      uri: `${process.env.TEST_HOST}/posts`,
      body: { title },
      json: true
    }

    const { response } = await request.post(options)
    const expected: Post = {
      id: 2,
      title,
      images: [],
      archived: false
    }

    assert.deepEqual(response, expected)
  })

  it('create post with images passed', async () => {
    const title = 'new post3'

    const options = {
      uri: `${process.env.TEST_HOST}/posts`,
      body: { title, images },
      json: true
    }

    const { response: { images: imageResult, ...postResult } } = await request.post(options) as IResponsePostType

    const expectedPost = {
      id: 3,
      title,
      archived: false
    }

    assert.deepEqual(postResult, expectedPost)
    assert(imageResult.map(({url}) => url).sort().join(' ') === images.map(({url}) => url).sort().join(' '))
  })

  it('update post passed', async () => {
    const id = 3
    const title = 'updated post'
    const url = 'updated url'

    const optionsGET1 = {
      uri: `${process.env.TEST_HOST}/posts/${id}`,
      json: true
    }

    const { response: response1 } = await request.get(optionsGET1) as IResponsePostType
    assert.notEqual(response1.title, title)
    assert.notEqual(response1.images[0].url, url)
    assert(response1.images.map(({ url }) => url).sort().join(' ') === images.map(({ url }) => url).sort().join(' '))

    const bodyToUpdate = {
      title,
      images: [
        {
          id: 0,
          url: 'https://new-url'
        },
        {
          id: response1.images[0].id,
          url,
        }
      ]
    }

    const optionsPUT = {
      uri: `${process.env.TEST_HOST}/posts/${id}`,
      body: bodyToUpdate,
      json: true
    }
    const {response: response2} = await request.put(optionsPUT)
    assert.equal(response2, 'OK')

    const optionsGET2 = {
      uri: `${process.env.TEST_HOST}/posts/${id}`,
      json: true
    }

    const { response: response3 } = await request.get(optionsGET2) as IResponsePostType
    assert.equal(response3.title, title)
    assert.equal(response3.images[0].url, url)

    const expectedImages = [{ url }, { url: images[1].url }, { url: bodyToUpdate.images[0].url }]
    assert(
      response3.images.map(({url}) => url).sort().join(' ') === expectedImages.map(({url}) => url).sort().join(' ')
    )
  })
})
