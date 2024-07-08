import express from 'express'
import { health } from '../controllers/health.controller'

const router = express.Router()

router.get('/', health)
router.all('/', (req, res) => {
  res.sendStatus(405)
})

export { router as healthRoute }
