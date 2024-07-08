import 'dotenv/config'
import app from './api/app'
import appConfig from './configs/app.config'
import logger from './configs/logger.config'
import { initializeDatabase } from './api/models/index.models'

const { HOSTNAME, PORT } = appConfig

const startServer = () => {
  app.listen(PORT, () => {
    logger.info(`Server running @ http://${HOSTNAME}:${PORT}`, {
      hostname: `${HOSTNAME}`,
      port: `${PORT}`,
    })
  })
}

initializeDatabase()
  .then(startServer)
  .catch((err) => {
    logger.error('Unable to initialize database', err)
  })
