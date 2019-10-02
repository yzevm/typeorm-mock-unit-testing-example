import { NextFunction, Request, Response, Router } from 'express'
import { postService } from '../services'

const APIError = {
  notFound: (id: string) => ({ response: { error: true, message: `The post was not found by id: ${id}` } })
}

export const postController = Router()

postController.route('/').get(async (_, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ response: await postService.getAll() })
  } catch (error) {
    next(error)
  }
})

postController.route('/:id').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await postService.getById(Number(req.params.id))
    response ? res.status(200).json({ response }) : res.status(404).json(APIError.notFound(req.params.id))
  } catch (error) {
    next(error)
  }
})

postController.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ response: await postService.create(req.body) })
  } catch (error) {
    next(error)
  }
})

postController.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await postService.update({ id: Number(req.params.id), ...req.body })

    response ? res.status(200).json({ response: 'OK' }) : res.status(404).json(APIError.notFound(req.params.id))
  } catch (error) {
    next(error)
  }
})
