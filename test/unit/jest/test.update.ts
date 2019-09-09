import { postService } from '../../../src/services'
import { post } from '../utils'
import { Post } from '../../../src/entities'

import typeorm = require('typeorm')

describe('typeorm => getRepository', () => {
  it('update method passed', async () => {
    const update = jest.fn().mockResolvedValue(true)
    const findOne = jest.fn().mockResolvedValue(post)

    typeorm.getRepository = jest.fn().mockReturnValue({
      update,
      findOne
    })

    const data = { body: post.title, id: post.id }
    const result = await postService.update(data)

    expect(result).toEqual(post)

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(1, Post)

    expect(update).toHaveBeenNthCalledWith(1, data.id, data.body)
    expect(findOne).toHaveBeenNthCalledWith(1, data.id)
  })
})
