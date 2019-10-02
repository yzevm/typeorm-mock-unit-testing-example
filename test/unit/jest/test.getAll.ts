import { postService } from '../../../src/services'
import { Post } from '../../../src/entities'

import typeorm = require('typeorm')

describe('postService => getAll', () => {
  it('getAll method passed', async () => {
    const fakeQueryBuilder = jest.fn().mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue('0x0')
    })

    typeorm.getConnection = jest.fn().mockReturnValue({
      getRepository: jest.fn().mockReturnValue({ createQueryBuilder: fakeQueryBuilder })
    })
    const result = await postService.getAll()

    expect(result).toEqual('0x0')

    const queryBuilder = typeorm.getConnection().getRepository(Post).createQueryBuilder
    expect(queryBuilder).toHaveBeenNthCalledWith(1, 'post')
    expect(queryBuilder().leftJoinAndSelect).toHaveBeenNthCalledWith(1, 'post.images', 'image')
    expect(queryBuilder().orderBy).toHaveBeenNthCalledWith(1, { post: 'ASC', image: 'ASC' })
    expect(queryBuilder().getMany).toHaveBeenNthCalledWith(1)
  })
})
