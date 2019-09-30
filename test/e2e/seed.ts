import { images, post } from '../utils'
import { Post, Image } from '../../src/entities'
import { getRepository } from 'typeorm'

export default async (): Promise<void> => {
  try {
    const createdPost = await getRepository(Post).save(post)

    const newImage1 = new Image()
    Object.assign(newImage1, { ...images[0], post: createdPost })
    await getRepository(Image).save(newImage1)

    const newImage2 = new Image()
    Object.assign(newImage2, { ...images[1], post: createdPost })
    await getRepository(Image).save(newImage2)
  } catch {
    throw new Error('seeding is failed')
  }
}
