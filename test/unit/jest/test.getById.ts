import { postService } from '../../../src/services'
import { post } from '../utils'
import { Post } from '../../../src/entities'

import typeorm = require('typeorm')

describe('typeorm => createQueryBuilder', () => {
  it('getById method passed', async () => {
    typeorm.createQueryBuilder = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(post)
    })
    const result = await postService.getById(post.id)

    expect(result).toEqual(post)

    expect(typeorm.createQueryBuilder).toHaveBeenNthCalledWith(1, Post)
    expect(typeorm.createQueryBuilder().select).toHaveBeenNthCalledWith(1, 'post')
    expect(typeorm.createQueryBuilder().from).toHaveBeenNthCalledWith(1, Post, 'post')
    expect(typeorm.createQueryBuilder().where).toHaveBeenNthCalledWith(1, 'post.id = :id', { id: 777 })
    expect(typeorm.createQueryBuilder().getOne).toHaveBeenNthCalledWith(1)
  })
})
