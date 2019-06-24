import * as typeorm from 'typeorm'
import { createSandbox, SinonSandbox } from 'sinon'

const image1 = {
  id: 11,
  url: 'http://1'
}

const image2 = {
  id: 12,
  url: 'http://2'
}

export const image = image1
export const images = [image1, image2]

export const post = {
  id: 777,
  title: 'just a title'
}

export class Mock {
  sandbox: SinonSandbox

  constructor(method: string | any, fakeData: any, args?: any) {
    this.sandbox = createSandbox()

    if (args) {
      this.sandbox.stub(typeorm, method).withArgs(args).returns(fakeData)
    } else {
      this.sandbox.stub(typeorm, method).returns(fakeData)
    }
  }

  close() {
    this.sandbox.restore()
  }
}
