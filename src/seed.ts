import { images, post } from '../test/e2e/utils'
import { Post, Image } from './entities'
import { getRepository } from 'typeorm'

export const startSeeding = async () => {
  try {
    await getRepository(Post).save(post)
    await Promise.all(images.map(image => getRepository(Image).save(image)))
  } catch {
    console.log('seeding is failed')
  }
}
