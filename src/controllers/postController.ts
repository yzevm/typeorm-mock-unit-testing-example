import { NextFunction, Request, Response, Router } from 'express'
import { postService, postImageService } from '../services'

const postController: Router = Router()

postController.route('/').get(async (_, res: Response, next: NextFunction) => {
  try {
    const response = await postService.getAll()
    return response ? res.status(200).json({ response }) : res.status(500).json({ response: `Something goes wrong` })
  } catch (error) {
    next(error)
  }
})

postController.route('/:id').get(async (req: Request, res: Response) => {
  try {
    const response = await postService.getById(req.params.id)
    res.status(200).json({ response })
  } catch (error) {
    res.status(404).json({ response: `Not found by id ${req.params.id}` })
  }
})

postController.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await postService.create(req.body)
    return response ? res.status(200).json({ response }) : res.status(500).json({ response: `Something goes wrong` })
  } catch (error) {
    next(error)
  }
})

postController.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      id: req.params.id,
      body: req.body
    }

    const response = await postService.update(data)
    return response ? res.status(200).json({ response }) : res.status(500).json({ response: `Something goes wrong` })
  } catch (error) {
    next(error)
  }
})

postController.route('/image').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await postImageService.createWithPicture(req.body)
    return response ? res.status(200).json({ response }) : res.status(500).json({ response: `Something goes wrong` })
  } catch (error) {
    next(error)
  }
})

export default postController
