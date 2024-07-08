import { Client } from 'pg'
import logger from '../../configs/logger.config'
import appConfig from '../../configs/app.config'

/**
 * `health` controller for `healthz` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 200 OK, 404 Bad Request, 503 Service Unavailable
 */
const health = (req, res, next) => {
  const { protocol, method, hostname, originalUrl, body } = req
  const headers = { ...req.headers }
  const metaData = { protocol, method, hostname, originalUrl, headers }
  logger.info(
    `Requesting ${method} ${protocol}://${hostname}${originalUrl}`,
    metaData
  )

  /**
   * Payload validation
   */
  if (Object.keys(body).length !== 0) {
    return res.sendStatus(400)
  }

  /**
   * Postgres database connection test with credentials validation
   * TODO: Use Sequelize instance to test connection
   * sequelize.authenticate()
   * https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-authenticate
   */
  const { USER, PASSWORD, DB, DBHOST, DBPORT } = appConfig
  const connectionString = `postgres://${USER}:${PASSWORD}@${DBHOST}:${DBPORT}/${DB}`

  const meta = { database: `${DB}`, user: `${USER}` }
  const client = new Client({ connectionString })
  client
    .connect()
    .then(() => {
      logger.info(`Successfully connected to postgres service`, meta)
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.sendStatus(200).json()
      client.end()
    })
    .catch((err) => {
      logger.error(`Unable to connect to postgres service`, meta)
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      return res.sendStatus(503)
    })
}

export { health }
