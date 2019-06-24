import { createStubInstance } from 'sinon'
import { Repository, Connection, SelectQueryBuilder } from 'typeorm'
import { deepEqual } from 'assert'

import { postImageService } from '../../src/services'
import { Mock, post, images } from './utils'
import { Post } from '../../src/entities'

describe('typeorm => getConnection && createQueryBuilder', () => {
  let mock1: Mock
  let mock2: Mock

  it('createWithPicture method passed', async () => {
    const fakeRepository = createStubInstance(Repository)
    const fakeConnection = createStubInstance(Connection)
    const fakeQueryBuilder = createStubInstance(SelectQueryBuilder)

    // I dunno how to make 2 diff repos https://stackoverflow.com/q/56721007/10432429
    fakeRepository.save.resolves(true)

    fakeQueryBuilder.leftJoinAndSelect.withArgs('post.images', 'image').returnsThis()
    fakeQueryBuilder.where.withArgs('post.title = :title', { title: post.title }).returnsThis()
    fakeQueryBuilder.getOne.resolves({ ...post, images })
    fakeRepository.createQueryBuilder.withArgs('post').returns(fakeQueryBuilder as any)
    fakeConnection.getRepository.withArgs(Post).returns(fakeRepository as any)

    mock1 = new Mock('getRepository', fakeRepository)
    mock2 = new Mock('getConnection', fakeConnection)

    const data = {
      post: { title: post.title },
      images: [images[0].url, images[1].url]
    }
    const result = await postImageService.createWithPicture(data)
    deepEqual(result, { ...post, images })
  })

  afterEach(() => {
    mock1.close()
    mock2.close()
  })
})
