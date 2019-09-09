import { postImageService } from '../../../src/services'
import { post, images } from '../utils'
import { Post, Image } from '../../../src/entities'

import typeorm = require('typeorm')

describe('typeorm => getConnection && createQueryBuilder', () => {
  it('createWithPicture method passed', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      save: jest.fn().mockReturnValue(true)
    })

    const fakeQueryBuilder = jest.fn().mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue({ ...post, images })
    })

    typeorm.getConnection = jest.fn().mockReturnValue({
      getRepository: jest.fn().mockReturnValue({ createQueryBuilder: fakeQueryBuilder })
    })

    const data = {
      post: { title: post.title },
      images: [images[0], images[1]]
    }
    const result = await postImageService.createWithPicture(data)

    expect(result).toEqual({ ...post, images })

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(1, Post)
    expect(typeorm.getRepository(Post).save).toHaveBeenNthCalledWith(1, data.post)

    expect(typeorm.getRepository).toHaveBeenNthCalledWith(2, Image)
    expect(typeorm.getRepository(Image).save).toHaveBeenNthCalledWith(2, {
      post: { title: post.title },
      url: data.images[0].url
    })
    expect(typeorm.getRepository(Image).save).toHaveBeenNthCalledWith(3, {
      post: { title: post.title },
      url: data.images[1].url
    })

    expect(typeorm.getConnection().getRepository).toHaveBeenNthCalledWith(1, Post)
    expect(typeorm.getConnection().getRepository(Post).createQueryBuilder).toHaveBeenNthCalledWith(1, 'post')

    const builder = typeorm
      .getConnection()
      .getRepository(Post)
      .createQueryBuilder()
    expect(builder.leftJoinAndSelect).toHaveBeenNthCalledWith(1, 'post.images', 'image')
    expect(builder.where).toHaveBeenNthCalledWith(1, 'post.title = :title', { title: data.post.title })
    expect(builder.getOne).toHaveBeenNthCalledWith(1)
  })
})
