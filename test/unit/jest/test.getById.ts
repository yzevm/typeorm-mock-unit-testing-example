import { postService } from '../../../src/services'
import { post } from '../../utils'
import { Post } from '../../../src/entities'

import typeorm = require('typeorm')

describe('postService => getById', () => {
  it('getById method passed', async () => {
    typeorm.createQueryBuilder = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue('0x0')
    })
    const result = await postService.getById(post.id)

    expect(result).toEqual('0x0')

    const qBuilder = typeorm.createQueryBuilder()
    expect(qBuilder.select).toHaveBeenNthCalledWith(1, ['post'])
    expect(qBuilder.from).toHaveBeenNthCalledWith(1, Post, 'post')
    expect(qBuilder.leftJoinAndSelect).toHaveBeenNthCalledWith(1, 'post.images', 'image')
    expect(qBuilder.where).toHaveBeenNthCalledWith(1, 'post.id = :id', { id: post.id })
    expect(qBuilder.orderBy).toHaveBeenNthCalledWith(1, { image: 'ASC' })
    expect(qBuilder.getOne).toHaveBeenNthCalledWith(1)
  })
})
