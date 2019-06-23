import 'reflect-metadata'
import express from 'express'
import { createConnection, ConnectionOptions } from 'typeorm'

import { Post, Image } from './entities'
import { startSeeding } from './seed'
import postController from './controllers/postController'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: [Post, Image],
  logging: false,
  synchronize: true,
  dropSchema: false
}

const router = express.Router()
router.use('/posts', postController)

export const startServer = async (E2E_TEST: boolean = false) => {
  const app = express()
  app.use(express.json(), express.urlencoded({ extended: true }))
  app.use('/api', router)

  try {
    await createConnection({ ...connectionOptions, dropSchema: E2E_TEST ? true : false })
    if (E2E_TEST) {
      await startSeeding()
    }

    const PORT = 3000
    return app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
  } catch (error) {
    console.log('Launch postgres via this command: "docker-compose up -d"')
  }
}
