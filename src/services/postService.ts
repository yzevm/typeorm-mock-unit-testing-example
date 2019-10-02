import { Post, Image } from '../entities'
import { getConnection, getRepository, createQueryBuilder } from 'typeorm'

type PostServiceImageData = Omit<Image, 'post'>

export interface IPostServiceDataToUpdate {
  id: number
  title: string
  archived: boolean
  images?: PostServiceImageData[]
}

export type PostServiceDataToCreate = Omit<IPostServiceDataToUpdate, 'id'>

class PostService {
  public getAll(): Promise<Post[]> {
    return getConnection()
      .getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.images', 'image')
      .orderBy({ post: 'ASC', image: 'ASC' })
      .getMany()
  }

  public getById(id: number): Promise<Post> {
    return this._findPostById(id)
  }

  public async create({ images, ...data }: PostServiceDataToCreate): Promise<Post> {
    const newPost = new Post()
    Object.assign(newPost, data)
    const post = await getRepository(Post).save(newPost)

    if (images && images.length) {
      await Promise.all(images.map(imageData => this._saveImage(imageData, post)))
    }

    return await this._findPostById(post.id)
  }

  public async update({ id, images, ...data }: IPostServiceDataToUpdate): Promise<boolean> {
    const postToUpdate = await this._findPostById(id)
    if (!postToUpdate) {
      return false
    }

    // @todo start transaction and commit during whole `update` request

    // @docs If ID equals 0, we'll create new Image entity
    const arrayOfNewImages = await Promise.all(
      images.map(receivedImage => {
        if (receivedImage.id === 0) {
          return this._saveImage(receivedImage, postToUpdate)
        }
      }).filter(notUndefined => notUndefined)
    )

    // @docs If db's ID equals received ID, we'll update Image entity
    const arrayOfUpdatedImages: Image[] = await Promise.all(
      postToUpdate.images.map(image => {
        images.forEach(receivedImage => {
          if (receivedImage.id === image.id) {
            getRepository(Image).save(receivedImage)
          }
        })
        return image
      })
    )

    postToUpdate.images = [...arrayOfUpdatedImages, ...arrayOfNewImages]
    Object.assign(postToUpdate, data)
    await getRepository(Post).save(postToUpdate)

    return true
  }

  private _findPostById(id: number): Promise<Post> {
    return createQueryBuilder()
      .select(['post'])
      .from(Post, 'post')
      .leftJoinAndSelect('post.images', 'image')
      .where('post.id = :id', { id })
      .orderBy({ image: 'ASC' })
      .getOne()
  }

  private _saveImage(data: PostServiceImageData, post: Post): Promise<Image> {
    const newImage = new Image()
    Object.assign(newImage, { ...data, post })

    return getRepository(Image).save(newImage)
  }
}

export const postService = new PostService()
