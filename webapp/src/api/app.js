import express from 'express'
import { errorHandler } from './middlewares/errorHandler'
import { healthRoute, httpCheckRoute } from './routes/index.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/healthz', healthRoute)
app.use('/v1/http-check', httpCheckRoute)
app.all('*', (req, res) => {
  res.sendStatus(404).json()
})
app.use(errorHandler)

export default app
