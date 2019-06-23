import { Post, Image } from '../entities'
import { getRepository, getConnection } from 'typeorm'

// Just to show that unit tests work with different services
export const postImageService = {
  createWithPicture: async (data: any) => {
    const post = new Post()
    post.title = data.post.title
    await getRepository(Post).save(post)

    await Promise.all(
      data.images.map(async ({ url }) => {
        const image = new Image()
        image.url = url
        image.post = post
        await getRepository(Image).save(image)
      })
    )

    return await getConnection()
      .getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.images', 'image')
      .where('post.title = :title', { title: post.title })
      .getOne()
  }
}

// SELECT * FROM post LEFT JOIN image ON post.id = "image.postId";
