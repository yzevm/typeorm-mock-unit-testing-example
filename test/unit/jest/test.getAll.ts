import { postService } from '../../../src/services'
import { post } from '../utils'
import { Post } from '../../../src/entities'

import typeorm = require('typeorm')

describe('typeorm => getManager', () => {
  it('getAll method passed', async () => {
    const find = jest.fn().mockResolvedValue([post])

    typeorm.getManager = jest.fn().mockReturnValue({ find })

    const result = await postService.getAll()

    expect(result).toEqual([post])

    expect(typeorm.getManager().find).toHaveBeenNthCalledWith(1, Post)
  })
})
