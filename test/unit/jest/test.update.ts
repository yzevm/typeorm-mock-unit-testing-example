import { postService, IPostServiceDataToUpdate } from '../../../src/services'
import { post, images, helpers } from '../../utils'

import typeorm = require('typeorm')
import { Post, Image } from '../../../src/entities'

describe('postService => update', () => {
  it('update post with new images and existed images passed', async () => {
    // @ts-ignore @docs Yeah, it's disaster, but I have already done tests for _findPostById() method (getById())
    postService._findPostById = jest.fn().mockResolvedValue({...post, images})

    typeorm.getRepository = jest.fn().mockReturnValue({
      save: jest.fn().mockResolvedValue('0x0')
    })

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

    const result = await postService.update(data)

    expect(result).toEqual(true)

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(1, Image)
    // @todo 1st call, re-write data?

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(2, Image)
    expect(typeorm.getRepository(Image).save).toHaveBeenNthCalledWith(2, data.images[1])

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(3, Post)
    const justUpdatedPost = helpers.omit(data, ['images'])
    expect(typeorm.getRepository(Post).save)
      .toHaveBeenNthCalledWith(3, { ...justUpdatedPost, images: [...images, '0x0'] })
  })
})
