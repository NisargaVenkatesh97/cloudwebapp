import express from 'express'
import {
  create,
  update,
  get,
  remove,
} from '../controllers/httpcheck.controller'
import { validationMiddleware } from '../middlewares/errorHandler'

const router = express.Router()

router.get('/', get)
router.get('/:id', get)

router.post('/', validationMiddleware, create)

router.put('/:id', validationMiddleware, update)

router.delete('/:id', remove)

router.all('*', (req, res) => {
  return res.sendStatus(405)
})

export { router as httpCheckRoute }
