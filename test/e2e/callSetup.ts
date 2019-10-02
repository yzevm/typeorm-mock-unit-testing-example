import startServer from '../../src/startServer'
import { AddressInfo } from 'net'

module.exports = async (): Promise<void> => {
  const app = await startServer(true)
  const { port } = app.address() as AddressInfo

  process.env.TEST_HOST = `http://localhost:${port}/api`
}
