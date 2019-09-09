import { postService } from '../../../src/services'
import { post } from '../utils'
import { Post } from '../../../src/entities'

import typeorm = require('typeorm')

describe('typeorm => getConnection', () => {
  it('create method passed', async () => {
    const create = jest.fn().mockReturnValue(post)
    const save = jest.fn().mockResolvedValue(post)

    typeorm.getConnection = jest.fn().mockReturnValue({
      getRepository: jest.fn().mockReturnValue({ create, save })
    })

    const data = { title: post.title }
    const result = await postService.create(data)

    expect(result).toEqual(post)

    expect(typeorm.getConnection().getRepository).toHaveBeenNthCalledWith(1, Post)
    expect(create).toHaveBeenNthCalledWith(1, data)
    expect(save).toHaveBeenNthCalledWith(1, post)
  })
})
