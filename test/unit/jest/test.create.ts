import { postService, PostServiceDataToCreate } from '../../../src/services'
import { post, images } from '../../utils'

import typeorm = require('typeorm')
import { Post, Image } from '../../../src/entities'

describe('postService => create', () => {
  it('create post with images passed', async () => {
    // @ts-ignore @docs Yeah, it's disaster, but I have already done tests for _findPostById() method (getById())
    postService._findPostById = jest.fn().mockResolvedValue('0x0')

    typeorm.getRepository = jest.fn().mockReturnValue({
      save: jest.fn().mockResolvedValue(post)
    })

    const dataToCreate: PostServiceDataToCreate = { ...post, images }
    const result = await postService.create(dataToCreate)

    expect(result).toEqual('0x0')

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(1, Post)
    expect(typeorm.getRepository(Post).save).toHaveBeenNthCalledWith(1, post)

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(2, Image)
    expect(typeorm.getRepository(Image).save).toHaveBeenNthCalledWith(2, { ...images[0], post })

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(3, Image)
    expect(typeorm.getRepository(Image).save).toHaveBeenNthCalledWith(3, { ...images[1], post })
  })
})
