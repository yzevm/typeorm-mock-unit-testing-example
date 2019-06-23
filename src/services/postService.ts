import { Post, Image } from '../entities'
import { getConnection, getManager, getRepository, createQueryBuilder, Repository } from 'typeorm'

export const postService = {
  getAll: async (): Promise<Post[]> => await getManager().find(Post),

  getById: async (id: string | number): Promise<Post | null> => {
    const post = await createQueryBuilder(Post)
      .select('post')
      .from(Post, 'post')
      .where('post.id = :id', { id })
      .getOne()

    return post ? post : Promise.reject(null)
  },

  create: async (data: any): Promise<Post> => {
    const postRepository: Repository<Post> = getConnection().getRepository(Post)
    const newPost = postRepository.create(data)

    return await postRepository.save(newPost as any)
  },

  update: async (data: any): Promise<Post> => {
    try {
      await getRepository(Post).update(data.id, data.body)

      return getRepository(Post).findOne(data.id)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
