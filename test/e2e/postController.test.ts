import * as request from 'request-promise'
import { deepEqual, notEqual } from 'assert'
import { post, images } from './utils'

describe('jest => typeorm => getConnection', () => {
  it('getAll post route passed', async () => {
    const options = {
      uri: `${process.env.TEST_HOST}/posts`,
      json: true
    }

    const { response } = await request.get(options)
    deepEqual(response, [post])
  })

  it('getById post route passed', async () => {
    const options = {
      uri: `${process.env.TEST_HOST}/posts/1`,
      json: true
    }

    const { response } = await request.get(options)
    deepEqual(response, post)
  })

  it('create post route passed', async () => {
    const options = {
      uri: `${process.env.TEST_HOST}/posts`,
      body: { title: 'new post' },
      json: true
    }

    const { response } = await request.post(options)
    deepEqual(response.title, 'new post')
  })

  it('update post route passed', async () => {
    const id = 1
    const title = 'updated post'

    const optionsGET = {
      uri: `${process.env.TEST_HOST}/posts/${id}`,
      json: true
    }

    const result1 = await request.get(optionsGET)
    notEqual(result1.response.title, 'new post')

    const optionsPUT = {
      uri: `${process.env.TEST_HOST}/posts/${id}`,
      body: { title },
      json: true
    }

    const result2 = await request.put(optionsPUT)
    deepEqual(result2.response.title, title)
  })

  it('create post with image route passed', async () => {
    const options = {
      uri: `${process.env.TEST_HOST}/posts/image`,
      body: {
        post: { title: 'new post with image' },
        images: [
          { url: images[0].url },
          { url: images[1].url },
        ]
      },
      json: true
    }

    const { response } = await request.post(options)
    deepEqual(response.title, 'new post with image')
    deepEqual(response.images[0].url, images[0].url)
    deepEqual(response.images[1].url, images[1].url)
  })
})
