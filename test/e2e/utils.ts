import { startServer } from '../../src/startServer'
import { AddressInfo } from 'net'
import { Post, Image } from '../../src/entities'

export const setup = async () => {
  const app = await startServer(true)
  const { port } = app.address() as AddressInfo

  process.env.TEST_HOST = `http://localhost:${port}/api`
}

const image1 = new Image()
image1.id = 11
image1.url = 'http://1'

const image2 = new Image()
image2.id = 12
image2.url = 'http://2'

export const images = [image1, image2]
export const post = new Post()
post.id = 1
post.title = 'just a title'
